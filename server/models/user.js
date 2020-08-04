const { hashPassword } = require('../utils/password');

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

      return hashPassword(this.password)
        .then((hash) => {
          return db.collection('users').insertOne(
            {
              ...doc,
              password: hash,
            },
            { w: 1, j: true }
          );
        })
        .then((data) => data.ops);
    }

    // finds a single user in the database
    static find(userInput) {
      const { userId, email } = userInput;
      let doc;

      if (userId) {
        doc = {
          _id: ObjectID(userId),
        };
      } else if (email) {
        doc = {
          email,
        };
      }

      return db
        .collection('users')
        .findOne(doc)
        .then((data) => data);
    }

    // updates a single user in the database
    static update(userId, updates) {
      const updateData = updates;
      const updateUser = () =>
        db.collection('users').updateOne(
          { _id: ObjectID(userId) },
          {
            $set: { ...updateData },
          },
          { w: 1, j: true }
        );

      if (updates.birthday) {
        updateData.birthday = new Date(updateData.birthday);
      }

      if (updateData.zipcode) {
        updateData.zipcode = new Int32(updateData.zipcode);
      }

      if (updates.password) {
        return hashPassword(updates.password)
          .then((data) => {
            updateData.password = data;

            return updateUser();
          })
          .then((data) => data.result);
      }

      return updateUser();
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
        .then((data) => data);
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
              pattern:
                '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,}$',
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
