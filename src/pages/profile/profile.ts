import template from "./profile.tmpl";
import Block from "../../utils/Block";
import SideBtn from "../../components/SideBtn/SideBtn";
import ProfileField from "../../components/ProfileField/ProfileField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import Action from "../../components/ProfileAction/ProfileAction";
import Popup from "../../components/Popup/Popup";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";
import { connect } from "../../store/connect";
import { User } from "../../utils/types";
import UserController from "../../controllers/UserController";
import { store } from "../../store/store";
import HTTP from "../../API/HTTP";

interface Props {
  user: User | null,
}

export const avatarStub = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

class Profile extends Block<Props> {
  constructor(props: Props) {
    super("main", props);
    this.element?.classList.add("profile-container");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  logout() {
    AuthController
      .logout()
      .then(() => {
        Router.getInstance().go("/");
      }).catch((e) => {
        console.error(e)
      });
  }

  togglePopup() {
    this.element?.querySelector(".popup")?.classList.toggle("visible");
  }

  updateAvatar(e: any) {
    e.preventDefault();
    const data = e.target as HTMLFormElement;
    const formData = new FormData(data);
    UserController
      .updateAvatar(formData)
      .then(() => {
        location.reload();
      }).catch((e) => {
        console.error(e)
      });
  }

  updateUser() {
    const { user } = store.getState();
    (this.element!.querySelector(".profile-title") as HTMLElement)!.textContent = (user as User).display_name as string | "";
    (this.element!.querySelector("#email") as HTMLInputElement)!.value = (user as User).email as string | "";
    (this.element!.querySelector("#login") as HTMLInputElement)!.value = (user as User).login as string | "";
    (this.element!.querySelector("#first_name") as HTMLInputElement)!.value = (user as User).first_name as string | "";
    (this.element!.querySelector("#second_name") as HTMLInputElement)!.value = (user as User).second_name as string | "";
    (this.element!.querySelector("#display_name") as HTMLInputElement)!.value = (user as User).display_name as string | "";
    (this.element!.querySelector("#phone") as HTMLInputElement)!.value = (user as User).phone as string | "";
    (this.element!.querySelector(".avatar-img") as HTMLImageElement)!.src = (user as User).avatar !== null ? 
    `${HTTP.BASE_URL}/resources${(user as User).avatar as string | ""}` : avatarStub;
  }

  init(): void {
    this.children.sideBtn = new SideBtn({});
    this.children.avatar = new Avatar({ 
      events: {
        click: () => {
          this.togglePopup();
        }
      },
    });
    this.children.email = new ProfileField({ label: "Email", type: "email", name: "email", edit: false });
    this.children.login = new ProfileField({ label: "Login", type: "text", name: "login", edit: false });
    this.children.firstName = new ProfileField({ label: "Name", type: "text", name: "first_name", edit: false });
    this.children.secondName = new ProfileField({ label: "Second name", type: "text", name: "second_name", edit: false });
    this.children.displayName = new ProfileField({ label: "Display name", type: "text", name: "display_name", edit: false });
    this.children.phone = new ProfileField({ label: "Phone", type: "phone", name: "phone", edit: false });

    this.children.profileChange = new Action({
      name: "Edit details",
      events: {
        click: () => {
          Router.getInstance().go("/settings/profile");
        }
      },
    });
    this.children.passwordChange = new Action({
      name: "Change password",
      events: {
        click: () => {
          Router.getInstance().go("/settings/password");
        }
      },
    });
    this.children.logout = new Action({
      class: "logout",
      name: "Log out",
      events: {
        click: (e) => {
          e.preventDefault();
          this.logout();
        }
      },
    });
    this.children.popup = new Popup({
      title: "Upload photo",
      content: new ProfileField({ label: "Click to select file", class:"file-upload", type: "file", name: "avatar", edit: true}),
      button_save: new Button({ name: "Save", type: "submit", class: "save" }),
      button_cancel: new Button({ name: "Cancel", class: "cancel" }),
      events: {
        submit: (e: SubmitEvent) => {
          this.updateAvatar(e);
          this.togglePopup();
        },
        click: (e: Event) => {         
          if (e.target === document.getElementsByClassName("cancel")[0]) {
            this.togglePopup();
          }
        }
      },
    });

    AuthController
    .fetchUser()
    .then(() => {
      this.updateUser();
    }).catch((e) => {
      console.error(e);
    });

    super.init();
  }

  componentDidUpdate(_oldProps: Props, newProps: Props): boolean {
    if (newProps.user) {
      this.updateUser();
    }
    return false
  }
}

const profileWithStore = connect((state) => ({
  user: state.user || "",
}));

export default profileWithStore(Profile);
