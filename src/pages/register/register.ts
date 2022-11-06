import template from "./register.tmpl";
import Block from "../../utils/Block";
import Form from "../../components/Form/Form";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";

interface Props {
  form: Block,
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
    emailField: new FormField({ label: "Email", type: "text", value: "", name: "email" }),
    loginField: new FormField({ label: "Login", type: "text", value: "", name: "login" }),
    firstNameField: new FormField({ label: "Name", type: "text", value: "", name: "first_name" }),
    secondNameField: new FormField({ label: "Second name", type: "text", value: "", name: "second_name" }),
    phoneField: new FormField({ label: "Phone", type: "text", value: "", name: "phone" }),
    passwordField: new FormField({ label: "Password", type: "password", value: "", name: "password" }),
    confirmPasswordField: new FormField({ label: "Confirm password", type: "password", value: "", name: "confirm_password" }),
    button: new Button({ name: "Sign up" }),
    linkTitle: "Sign in",
    link: "/signin",
    }),
});

export default RegisterPage;
