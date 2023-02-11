import express from "express";
import { getUser, signIn, signUp } from "../controllers/users";

const usersRouter = express.Router();

usersRouter.get(
  "/:username",
  async (req: express.Request, res: express.Response) => {
    const users = await getUser(req.params.username);
    res.json(users);
  }
);

usersRouter.post(
  "/signup",
  async (req: express.Request, res: express.Response) => {
    const { name, username, password, avatarImg } = req.body;
    const createdUser = await signUp({ name, username, password, avatarImg });
    res.status(201).json(createdUser);
  }
);

usersRouter.post(
  "/signin",
  async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const token = signIn({ username, password });
    if (!token) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    res.cookie("access_token", token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    res.status(200).json({ ok: true });
  }
);

export default usersRouter;
