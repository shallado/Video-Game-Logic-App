// sets the document structure for the videoGames collection
// provided methods that are available to be performed on the videoGame collection
const videoGameModel = (db) => {
  class VideoGame {
    constructor(title) {
      this.title = title;
    }

    create() {
      const doc = { title: this.title };

      return db
        .collection('videoGames')
        .insertOne(doc, { w: 1, j: true })
        .then((results) => results)
        .catch((err) => err);
    }
  }

  return VideoGame;
};

module.exports = {
  videoGameModel,
};
