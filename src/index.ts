import "./style.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
// import "./modules/auth/index";
// import "./layout/main/index";
// import "./layout/errorPage/index";
// import "./layout/profile/index";

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app')!;
  if (window.location.pathname === '/signin') {
    root.append(Login.getContent()!);
    Login.dispatchComponentDidMount();
  }
  // if (window.location.pathname === '/signup') {
  //   root.append(Register.getContent()!);
  //   Register.dispatchComponentDidMount();
  // }
});