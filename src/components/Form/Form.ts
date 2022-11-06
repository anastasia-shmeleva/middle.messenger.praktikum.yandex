import Block from "../../utils/Block";
import { validateOnSubmit } from "../../utils/validate";
import template from "./Form.tmpl";

interface Props {
  name: string,
  emailField?: Block,
  loginField?: Block,
  firstNameField?: Block,
  secondNameField?: Block,
  phoneField?: Block,
  passwordField?: Block,
  confirmPasswordField?: Block,
  button: Block,
  linkTitle: string,
  link: string,
  events?: {
    submit: (e: Event) => void;
  },
}

export default class Form extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => validateOnSubmit(e)
    };
    super("form", { ...props, events });

    this.element?.classList.add("form");
    this.element?.classList.add("login");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
