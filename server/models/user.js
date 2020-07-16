// sets the document structure for the user collection
// provided methods that are available to be performed on the user collection
const userModel = (db, Int32) => {
  class User {
    constructor(
      username,
      password,
      email,
      city,
      zipcode,
      birthday,
      gender,
      profilePhoto = 'multer will be used',
      videoGames = []
    ) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.city = city;
      this.zipcode = zipcode;
      this.birthday = birthday;
      this.gender = gender;
      this.profilePhoto = profilePhoto;
      this.videoGames = videoGames;
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

      return db
        .collection('users')
        .insertOne(doc, { w: 1, j: true })
        .then((results) => results)
        .catch((err) => err);
    }
  }

  return User;
};

// schema validation
const createUserTable = (db) => {
  db.command({
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
            // must be 8 to 15 characters long
            // contain one lowercase letter, one uppercase letter, one numeric digit and one special character
            pattern:
              '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,15}$',
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
            description: 'must be binData and is required',
          },
          videoGames: {
            bsonType: 'array',
            description: 'must be an array and is required',
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
        message: 'Successfully created schema validation',
      })
    )
    .catch((err) => console.log(err));
};

// indexing specific fields
const indexFields = (db) => {
  db.collection('users')
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
  createUserTable,
  indexFields,
};
