const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minLength: 5, maxLength: 30 },
    email: { type: String, required: true, minLength: 5, maxLength: 100 },
    password: { type: String, selecte: false },
    //   creatorId: {type: }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
