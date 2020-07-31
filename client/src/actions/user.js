export const userSignUp = ({
  username,
  password,
  email,
  city,
  zipcode,
  birthday,
  gender,
} = {}) => ({
  type: 'USER_SIGN_UP',
  userInfo: {
    username,
    password,
    email,
    city,
    zipcode,
    birthday,
    gender,
  },
});
