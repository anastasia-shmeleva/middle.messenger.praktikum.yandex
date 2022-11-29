import template from "./login.tmpl";
import Block from "../../utils/Block";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import AuthController from "../../controllers/AuthController";
import { SignInData } from "../../utils/types";
import Router from "../../utils/Router";

interface Props {
  form: Block,
}

export default class Login extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("container");
  }

  signIn(data: SignInData) {
    if (data) {
      AuthController
        .signIn(data)
        .then(() => {
          Router.getInstance().go("/messenger");
        }).catch((e) => {
          console.error(e)
        });
    }
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  init(): void {
    this.children.form = new Form({
      name: "Sign in",
      login: new FormField({ label: "Login", type: "text", value: "", name: "login" }),
      password: new FormField({ label: "Password", type: "password", value: "", name: "password" }),
      button: new Button({ name: "Sign in", type: "submit" }),
      linkTitle: "Create account",
      link: "/sign-up",
      controller: this.signIn,
    });

    super.init();
  }
}
