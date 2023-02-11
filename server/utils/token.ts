import jwt from "jsonwebtoken";
import { User } from "../models";

export const getTokenFrom = (request: any) => {
  const token = request.cookies.access_token;
  if (token && token.startsWith("Bearer ")) {
    return token.replace("Bearer ", "");
  }
  return null;
};

export const getAuthorizedUser = async (request: any, response: any) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  return user
};
