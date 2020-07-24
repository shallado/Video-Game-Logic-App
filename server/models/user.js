const bcrypt = require('bcrypt');
const validation = require('../utilis/validation');

// sets the document structure for the user collection
// provided methods that are available to be performed on the user collection
const userModel = (db, Int32, ObjectID) => {
  class User {
    constructor(userInfo) {
      const {
        username,
        password,
        email,
        city,
        zipcode,
        birthday,
        gender,
      } = userInfo;

      const defaultProfilePhoto = `https://storage.cloud.google.com/${this.bucket}/default-profile-photo.jpeg`;

      this.username = username;
      this.password = password;
      this.email = email;
      this.city = city;
      this.zipcode = zipcode;
      this.birthday = birthday;
      this.gender = gender;
      this.profilePhoto = defaultProfilePhoto;
      this.videoGames = [];
    }

    // create a user document and adds it the user collection
    create() {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      const saltRounds = 12;
      const plainTextPassword = this.password;
      const doc = {
        username: this.username,
        password: this.password,
        email: this.email,
        city: this.city,
        zipcode: new Int32(this.zipcode),
        birthday: new Date(this.birthday),
        gender: this.gender,
        profilePhoto: this.profilePhoto,
        videoGames: this.videoGames,
      };

      // must be 8 to 15 characters long
      // contain one lowercase letter, one uppercase letter, one numeric digit and one special character
      if (!this.password.match(regex)) {
        throw new Error('password does not meet requirements try again');
      }

      return validation
        .verifyLocation(this.city, this.zipcode)
        .then((data) => {
          const err = data;

          if (err) {
            throw err;
          }

          return bcrypt.hash(plainTextPassword, saltRounds);
        })
        .then((hash) => {
          return db.collection('users').insertOne(
            {
              ...doc,
              password: hash,
            },
            { w: 1, j: true }
          );
        })
        .then((results) => results)
        .catch((err) => err);
    }

    static update(userId, updates) {
      const { zipcode, birthday } = updates;
      return validation
        .verifyLocation(updates.city, updates.zipcode)
        .then((data) => {
          const err = data;

          if (err) {
            throw err;
          }

          return db.collection('users').updateOne(
            { _id: new ObjectID(userId) },
            {
              $set: {
                ...updates,
                zipcode: new Int32(zipcode),
                birthday: new Date(birthday),
              },
            },
            {
              w: 1,
              j: true,
            }
          );
        })
        .then((data) => {
          return data.result;
        })
        .catch((err) => err);
    }

    // validates user password for sign in
    static isPasswordValid(email, password) {
      let userInfo;

      return db
        .collection('users')
        .findOne(
          { email },
          {
            projection: {
              _id: 0,
              username: 1,
              password: 1,
              email: 1,
              city: 1,
              zipcode: 1,
              birthday: 1,
              gender: 1,
            },
          }
        )
        .then((result) => {
          userInfo = {
            username: result.username,
            email: result.email,
            city: result.city,
            zipcode: result.zipcode,
            birthday: result.birthday,
            gender: result.gender,
          };

          // compares user input password to hash password in database
          return bcrypt.compare(password, result.password);
        })
        .then((isValid) => {
          // expose user document is password is valid
          if (isValid) {
            return userInfo;
          }

          // error thrown if user password is invalid
          const invalidCredentialsError = new Error();
          invalidCredentialsError.message =
            'invalid password credentials try again';
          invalidCredentialsError.number = 401;
          throw invalidCredentialsError;
        })
        .catch((err) => err);
    }

    // uploads profile photo of user
    static upload(userId, photoFile) {
      const { path } = photoFile;

      return db
        .collection('users')
        .updateOne(
          { _id: new ObjectID(userId) },
          {
            $set: {
              profilePhoto: path,
            },
          },
          { w: 1, j: 1 }
        )
        .then((data) => data.result)
        .catch((err) => err);
    }
  }

  return User;
};

// schema and validation
const userSchema = (db) => {
  return db
    .command({
      collMod: 'users',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [
            'username',
            'password',
            'email',
            'city',
            'zipcode',
            'birthday',
            'gender',
          ],
          properties: {
            username: {
              bsonType: 'string',
              description: 'must be a string and is required',
              maxLength: 26,
            },
            password: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            email: {
              bsonType: 'string',
              description: 'must be a string and is required',
              // check to it follows normal email structure
              pattern: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
            },
            city: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            zipcode: {
              bsonType: 'int',
              description: 'must be an int and is required',
              maxLength: 5,
            },
            birthday: {
              bsonType: 'date',
              description: 'must be a date and is required',
            },
            gender: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            profilePhoto: {
              bsonType: 'string',
              description: 'string',
            },
            videoGames: {
              bsonType: 'array',
              description: 'must be an array',
              items: {
                bsonType: 'object',
                required: ['videoGameId'],
                properties: {
                  videoGameId: {
                    bsonType: 'objectId',
                    description: 'must be an objectId and is required',
                  },
                },
              },
            },
          },
        },
      },
    })
    .then(() =>
      console.log({
        message: 'Successfully created users collection schema',
      })
    )
    .catch((err) => console.log(err));
};

// indexing specific fields
const userIndexFields = (db) => {
  return db
    .collection('users')
    .createIndexes([
      {
        key: { email: -1 },
        unique: true,
      },
      {
        key: { username: -1 },
        unique: true,
      },
    ])
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

module.exports = {
  userModel,
  userSchema,
  userIndexFields,
};
