import template from "./login.tmpl";
import Block from "../../utils/Block";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";

interface Props {
  form: Block,
}

export default class Login extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("container");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  init(): void {
    this.children.form = new Form({
      name: "Sign in",
      loginField: new FormField({ label: "Login", type: "text", value: "", name: "login" }),
      passwordField: new FormField({ label: "Password", type: "password", value: "", name: "password" }),
      button: new Button({ name: "Sign in" }),
      linkTitle: "Create account",
      link: "/sign-up",
    });

    super.init();
  }
}
