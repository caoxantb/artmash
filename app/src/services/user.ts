const userAPI = "https://filmmash.vercel.app/api/users";

const getUser = async (username: string) => {
  const res = await fetch(`${userAPI}/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  const user = await res.json();
  return user;
};

const signUp = async (
  name: string,
  username: string,
  password: string,
  avatarImg: string
) => {
  const res = await fetch(`${userAPI}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
    body: JSON.stringify({ name, username, password, avatarImg }),
  });
  const user = await res.json();

  return user;
};

const signIn = async (username: string, password: string) => {
  const res = await fetch(`${userAPI}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });
  const user = await res.json();
  return user;
};

export { getUser, signIn, signUp };
