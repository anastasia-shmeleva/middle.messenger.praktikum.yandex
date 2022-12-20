import "./styles/style.css";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profile";
import Settings from "./pages/settings/settings";
import Password from "./pages/password/password";
import Chats from "./pages/chats/chats";
import { Error404, Error500 } from "./pages/error/error";
import Router from "./utils/Router";
import { User } from "./utils/types";
import AuthController from "./controllers/AuthController";
import Websocket from "./API/Websocket";

const router = new Router("#app");
export const ws = new Websocket();

async function start() {
  let user: User | unknown = null;

  const checkAuth = async () => {
    try {
      user = await AuthController.getUser();
      return true;
    } catch (e) {
      return false;
    }
  };

  await checkAuth().then(() => {
    if (user) {
      if (window.location.pathname === "/" || window.location.pathname == "/sign-up") {
        Router.getInstance().go("/messenger");
      }
    } else {
      if (window.location.pathname === "/sign-up") {
        Router.getInstance().go("/sign-up");
      } else {
        Router.getInstance().go("/")
      }
    }
  });

  if (
    window.location.pathname !== "/" && 
    window.location.pathname !== "/sign-up" && 
    window.location.pathname !== "/settings" && 
    window.location.pathname !== "/profile" && 
    window.location.pathname !== "/password" && 
    window.location.pathname !== "/messenger"
  ) {
    Router.getInstance().go("/404");
  }

  router
    .use({
      pathname: "/", 
      block: Login, 
    })
    .use({
      pathname: "/sign-up", 
      block: Register, 
    })
    .use({
      pathname: "/settings", 
      block: Profile, 
    })
    .use({
      pathname: "/profile", 
      block: Settings, 
    })
    .use({
      pathname: "/password", 
      block: Password, 
    })
    .use({
      pathname: "/messenger", 
      block: Chats, 
    })
    .use({ 
      pathname: '/500', 
      block: Error500, 
    })
    .use({ 
      pathname: '/404', 
      block: Error404, 
    })
    .start();
}

start();
