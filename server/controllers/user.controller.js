const { User } = require('../models');

// process user input in order to add user info to database
exports.create = (req, res) => {
  const {
    username,
    password,
    email,
    city,
    zipcode,
    birthday,
    gender,
  } = req.body;

  const user = new User(
    username,
    password,
    email,
    city,
    zipcode,
    birthday,
    gender
  );

  user
    .create()
    .then((data) => {
      if (data.code === 121) {
        return res.send({
          message: 'Document failed validation',
        });
      }

      res.send({
        message: 'Successfully added user',
        data: data.ops,
      });
    })
    .catch((err) =>
      res.status(500).send({ message: err.message, error: err.stack })
    );
};
