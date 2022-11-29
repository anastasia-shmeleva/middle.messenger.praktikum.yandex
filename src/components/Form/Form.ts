import Block from "../../utils/Block";
import { validateOnSubmit } from "../../utils/validate";
import template from "./Form.tmpl";

interface Props {
  name: string,
  email?: Block,
  login?: Block,
  firstName?: Block,
  secondName?: Block,
  phone?: Block,
  password?: Block,
  confirmPassword?: Block,
  button: Block,
  linkTitle: string,
  link: string,
  events?: {
    submit: (e: Event) => void;
  },
  controller: (data: any) => void,
}

export default class Form extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => {
        const data = validateOnSubmit(e);
        this.props.controller(data);
      }
    };
    super("form", { ...props, events });

    this.element?.classList.add("form");
    this.element?.classList.add("login");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
