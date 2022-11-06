import "./styles/style.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Error404, Error500 } from "./pages/error/error";
import Profile from "./pages/profile/profile";
import Chats from "./pages/chats/chats"

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  if (window.location.pathname === '/') {
    window.location.replace('/signin');
  }
  if (window.location.pathname === '/signin') {
    root.append(Login.getContent()!);
    Login.dispatchComponentDidMount();
  }
  if (window.location.pathname === '/signup') {
    root.append(Register.getContent()!);
    Register.dispatchComponentDidMount();
  }
  if (window.location.pathname === '/error500') {
    root.append(Error500.getContent()!);
    Error500.dispatchComponentDidMount();
  }
  if (window.location.pathname === '/error404') {
    root.append(Error404.getContent()!);
    Error404.dispatchComponentDidMount();
  }
  if (window.location.pathname === '/profile') {
    root.append(Profile.getContent()!);
    Profile.dispatchComponentDidMount();
  }
  if (window.location.pathname === '/chats') {
    root.append(Chats.getContent()!);
    Chats.dispatchComponentDidMount();
  }
});
