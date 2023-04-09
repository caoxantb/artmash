import express from "express";
import { usersController } from "../controllers";

const usersRouter = express.Router();
const { getUser, signIn, signUp } = usersController;

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
    const token = await signIn({ username, password });
    res.status(201).json(createdUser);
    res.cookie("access_token", token, {
      maxAge: 365 * 24 * 60 * 60 * 100,
      httpOnly: true,
    });
    res.status(200).json({ ok: true });
  }
);

usersRouter.post(
  "/signin",
  async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const token = await signIn({ username, password });
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
