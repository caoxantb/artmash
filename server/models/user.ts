import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  name: string;
  username: { type: string; required: true; unique: true };
  passwordHash: string;
  avatarImg?: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  name: { type: String, required: true, unique: true },
  passwordHash: String,
  avatarImg: String,
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
