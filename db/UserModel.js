const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String},
    email: { type: String},
    password: { type: String},
    registeredPic : { type: String},
  },
  {
      timestamps: {},
      usePushEach: true
  }
);


const User = mongoose.model('User', UserSchema)

module.exports = User