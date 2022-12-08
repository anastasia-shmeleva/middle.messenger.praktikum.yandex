import template from "./register.tmpl";
import Block from "../../utils/Block";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import AuthController from "../../controllers/AuthController";
import { SignUpData } from "../../utils/types";
import Router from "../../utils/Router";

interface Props {
  form: Block,
}

export default class Register extends Block<Props> {
  constructor(props: Props) {
    super("main", props);
    this.element?.classList.add("container");
  }

  signUp(data: SignUpData) {
    if (data) {
      AuthController
        .signUp(data)
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
      name: "Register",
      email: new FormField({ label: "Email", type: "text", value: "", name: "email" }),
      login: new FormField({ label: "Login", type: "text", value: "", name: "login" }),
      firstName: new FormField({ label: "Name", type: "text", value: "", name: "first_name" }),
      secondName: new FormField({ label: "Second name", type: "text", value: "", name: "second_name" }),
      phone: new FormField({ label: "Phone", type: "text", value: "", name: "phone" }),
      password: new FormField({ label: "Password", type: "password", value: "", name: "password" }),
      confirmPassword: new FormField({ label: "Confirm password", type: "password", value: "", name: "confirmPassword" }),
      button: new Button({ name: "Sign up", type: "submit" }),
      linkTitle: "Sign in",
      link: "/",
      controller: this.signUp,
    });

    super.init();
  }
}
