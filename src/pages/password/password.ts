import template from "./password.tmpl";
import Block from "../../utils/Block";
import SideBtn from "../../components/SideBtn/SideBtn";
import ProfileField from "../../components/ProfileField/ProfileField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import AuthController from "../../controllers/AuthController";
import { connect } from "../../store/connect";
import { PasswordData, User } from "../../utils/types";
import UserController from "../../controllers/UserController";
import { store } from "../../store/store";
import Router from "../../utils/Router";
import { validateForm } from "../../utils/validate";

interface Props {
  user: User | null,
  events: {
    submit: (e: Event) => void;
  };
}

class Password extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("profile-container");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  updateUser() {
    const { user } = store.getState();
    (this.element!.querySelector(".avatar-img") as HTMLImageElement)!.src = `https://ya-praktikum.tech/api/v2/resources${(user as User).avatar as string | ""}`;
  }

  updatePassword(e: Event) {
    e.preventDefault();
    let isValid = false;
    const form = e.target as HTMLFormElement
    const formData = new FormData(form);
    const passwordList = Object.fromEntries(formData.entries());
    const inputList = form.querySelectorAll("input");
    isValid = validateForm(inputList);
    if (isValid) {
      UserController.updatePassword(passwordList as unknown as PasswordData).then(() => {
        Router.getInstance().go('/settings');
      }).catch((e) => {
        console.error(e);
      });
    }
  }

  init(): void {
    this.children.sideBtn = new SideBtn({});
    this.children.avatar = new Avatar({});
    this.children.oldPassword = new ProfileField({ label: "Old password", type: "password", value: "", name: "oldPassword", edit: true });
    this.children.newPassword = new ProfileField({ label: "New Password", type: "password", value: "", name: "newPassword", edit: true });
    this.children.confirmPassword = new ProfileField({ label: "Confirm password", type: "password", value: "", name: "confirmPassword", edit: true });
    this.children.button = new Button({ name: "Save", type: "submit", class: "save", form: "password" });
    this.props.events = {
      submit: (e: Event) => {
        this.updatePassword(e);
      },
    };

    AuthController
    .fetchUser()
    .then(() => {
      this.updateUser();
    }).catch((e) => {
      console.error(e);
    });

    super.init();
  }
}

const passwordWithStore = connect((state) => ({
  user: state.user || "",
}));

export default passwordWithStore(Password);