const express = require('express');
const userRouter = require('./routes/user');
require('./models');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

userRouter(app);

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
