import template from "./register.tmpl";
import Block from "../../utils/Block";
import Form from "../../components/form/form";
import FormField from "../../components/formField/formField";
import Button from "../../components/button/button";

interface Props {
  form: Block;
}

class Register extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("container");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const RegisterPage = new Register({
  form: new Form({
    name: "Register",
    fields: [
      new FormField({ label: "Email", type: "text", value: "", name: "email" }),
      new FormField({ label: "Login", type: "text", value: "", name: "login" }),
      new FormField({ label: "Name", type: "text", value: "", name: "first_name" }),
      new FormField({ label: "Second name", type: "text", value: "", name: "second_name" }),
      new FormField({ label: "Phone", type: "text", value: "", name: "phone" }),
      new FormField({ label: "Password", type: "password", value: "", name: "password" }),
      new FormField({ label: "Confirm password", type: "password", value: "", name: "password" }),
    ],
    button: new Button({ name: "Sign up" }),
    linkTitle: "Sign in",
    link: "/signin",
    }),
});

export default RegisterPage;