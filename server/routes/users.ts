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
    const _createdUser = await signUp({ name, username, password, avatarImg });
    const [token, _user] = await signIn({ username, password });
    res.status(200).send({ token, username, name, avatarImg });
  }
);

usersRouter.post(
  "/signin",
  async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const [token, user] = await signIn({ username, password });
    if (!token) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }
    res
      .status(200)
      .send({
        token,
        username: user.username,
        name: user.username,
        avatarImg: user.avatarImg,
      });
  }
);

export default usersRouter;
