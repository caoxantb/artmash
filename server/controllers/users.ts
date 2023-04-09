import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";

const signUp = async ({
  name,
  username,
  password,
  avatarImg,
}: {
  name: string;
  username: string;
  password: string;
  avatarImg?: string;
}) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username,
    name,
    passwordHash,
    avatarImg: avatarImg || "", //TODO
  });

  return user;
};

const signIn = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await User.findOne({ username });
  const passwordCorrect = !user
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return null;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return token;
};

const getUser = async (username: string) => {
  const user = await User.findOne({ username });
  return user;
};

export default { signIn, signUp, getUser };
