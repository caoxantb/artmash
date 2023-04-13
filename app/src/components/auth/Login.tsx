import { component$, $, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { signIn } from "~/services/user";
import {
  StyledAuth,
  AuthType,
  StyledForm,
  FormLabel,
  FormInput,
  FormButton,
  LinkText
} from "../styled/auth.css";

const Login = component$(() => {
  const store: { username: string; password: string } = useStore({
    username: "",
    password: "",
  });
  const nav = useNavigate()

  const handleChange = $((e: any) => {
    const cloneStore = {
      ...store,
      [e.target.name]: e.target.value,
    };

    store.username = cloneStore.username
    store.password = cloneStore.password
  });

  const handleSubmit = $(async () => {
    const {username, password} = store
    const user = await signIn(username, password)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    nav('/')
  })

  return (
    <StyledAuth>
      <AuthType>LOGIN</AuthType>
      <p> Does not have an account yet? Sign up <LinkText href="/signup">here</LinkText></p>
      <StyledForm preventdefault:submit onSubmit$={handleSubmit}>
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
        <FormButton type="submit">Login</FormButton>
      </StyledForm>
    </StyledAuth>
  );
});

export default Login;
