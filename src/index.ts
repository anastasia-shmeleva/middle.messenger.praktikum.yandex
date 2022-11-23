import "./styles/style.css";
import Login from "./pages/login/login";
// import Register from "./pages/register/register";
// import { Error404, Error500 } from "./pages/error/error";
// import Profile from "./pages/profile/profile";
// import Chats from "./pages/chats/chats";
import Router from "./utils/Router";

const router = new Router("#app");

document.addEventListener("DOMContentLoaded", () => {
  return router
    .use({
      pathname: "/", 
      block: Login, 
    })
    // .use("/sign-up", Register)
    // .use("/error500", Error500)
    // .use("/error404", Error404)
    // .use("/settings", Profile)
    // .use("/messenger", Chats)
    .start();
});
