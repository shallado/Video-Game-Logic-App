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

module.exports = userModel;
