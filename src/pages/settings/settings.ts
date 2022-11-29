import template from "./settings.tmpl";
import Block from "../../utils/Block";
import SideBtn from "../../components/SideBtn/SideBtn";
import ProfileField from "../../components/ProfileField/ProfileField";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import AuthController from "../../controllers/AuthController";
import { connect } from "../../store/connect";
import UserController from "../../controllers/UserController";
import { store } from "../../store/store";
import { validateForm } from "../../utils/validate";
import Router from "../../utils/Router";
import { User } from "../../utils/types";

interface Props {
  user: User | null,
  events: {
    submit: (e: SubmitEvent) => void;
  };
}

class Settings extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("profile-container");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  updateUser() {
    const { user } = store.getState();
    (this.element!.querySelector("#email") as HTMLInputElement)!.value = (user as User).email as string | "";
    (this.element!.querySelector("#login") as HTMLInputElement)!.value = (user as User).login as string | "";
    (this.element!.querySelector("#first_name") as HTMLInputElement)!.value = (user as User).first_name as string | "";
    (this.element!.querySelector("#second_name") as HTMLInputElement)!.value = (user as User).second_name as string | "";
    (this.element!.querySelector("#display_name") as HTMLInputElement)!.value = (user as User).display_name as string | "";
    (this.element!.querySelector("#phone") as HTMLInputElement)!.value = (user as User).phone as string | "";
    (this.element!.querySelector(".avatar-img") as HTMLImageElement)!.src = `https://ya-praktikum.tech/api/v2/resources${(user as User).avatar as string | ""}`;
  }

  update(e: Event) {
    e.preventDefault();
    let isValid = false;
    const form = e.target as HTMLFormElement
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());
    const inputList = form.querySelectorAll("input");
    isValid = validateForm(inputList);
    if (isValid) {
      UserController.updateUser(userData as unknown as User).then(() => {
        Router.getInstance().go('/settings');
      }).catch((e) => {
        console.error(e);
      });
    }
  }

  init(): void {
    this.children.sideBtn = new SideBtn({});
    this.children.avatar = new Avatar({});
    this.children.email = new ProfileField({ label: "Email", type: "email", name: "email", edit: true });
    this.children.login = new ProfileField({ label: "Login", type: "text", name: "login", edit: true });
    this.children.firstName = new ProfileField({ label: "Name", type: "text", name: "first_name", edit: true });
    this.children.secondName = new ProfileField({ label: "Second name", type: "text", name: "second_name", edit: true });
    this.children.displayName = new ProfileField({ label: "Display name", type: "text", name: "display_name", edit: true });
    this.children.phone = new ProfileField({ label: "Phone", type: "phone", name: "phone", edit: true });
    this.children.button = new Button({ name: "Save", type: "submit", class: "save", form: "user" });
    this.props.events = {
      submit: (e: Event) => {
        this.update(e);
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

const settingsWithStore = connect((state) => ({
  user: state.user || "",
}));

export default settingsWithStore(Settings);