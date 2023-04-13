import { component$, $, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { signUp } from "~/services/user";
import {
  StyledAuth,
  AuthType,
  StyledForm,
  FormLabel,
  FormInput,
  FormButton,
  LinkText,
} from "../styled/auth.css";

const SignUp = component$(() => {
  const store: {
    username: string;
    password: string;
    name: string;
    avatarImg: string;
  } = useStore({
    name: "",
    username: "",
    password: "",
    avatarImg: "",
  });
  const nav = useNavigate();


  const handleChange = $((e: any) => {
    const cloneStore = {
      ...store,
      [e.target.name]: e.target.value,
    };

    store.username = cloneStore.username;
    store.password = cloneStore.password;
    store.name = cloneStore.name;
    store.avatarImg = cloneStore.avatarImg;
  });

  const handleSubmit = $(async () => {
    try {
      const {name, username, password, avatarImg} = store
      const user = await signUp(name, username, password, avatarImg)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      nav('/')
    } catch (e) {
      console.error(e)
    }

  });

  return (
    <StyledAuth>
      <AuthType>SIGN UP</AuthType>
      <p>
        Have an account? Log in <LinkText href="/login">here</LinkText>
      </p>
      <StyledForm preventdefault:submit onSubmit$={handleSubmit}>
      <FormLabel>Name</FormLabel>
        <FormInput
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange$={handleChange}
        />
        <FormLabel>Username</FormLabel>
        <FormInput
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange$={handleChange}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange$={handleChange}
        />
        <FormLabel>Avatar URL</FormLabel>
        <FormInput
          type="text"
          name="avatarImg"
          id="avatarImg"
          placeholder="Avatar URL"
          onChange$={handleChange}
        />
        <FormButton type="submit">Sign up</FormButton>
      </StyledForm>
    </StyledAuth>
  );
});

export default SignUp;
