import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  name: { type: string; required: true; unique: true };
  username: string;
  passwordHash: string;
  avatarImg?: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  avatarImg: String,
  galleries: [{ type: String, ref: "Gallery" }],
});

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
