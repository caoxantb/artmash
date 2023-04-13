import jwt from "jsonwebtoken";
import { User } from "../models";

export const getAuthorizedUser = async (request: any, response: any) => {
  const authorization = request.get("authorization");
  const token =
    authorization && authorization.toLowerCase().startsWith("Bearer ")
      ? authorization.substring(7)
      : "";

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  return user
};