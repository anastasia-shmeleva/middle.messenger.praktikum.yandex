import Block from "../../utils/Block";
import template from "./Button.tmpl";

interface Props {
  name: string,
  type?: string,
  class?: string,
  form?: string,
}

export default class Button extends Block<Props> {
  constructor(props: Props) {
    super("button", props);
    this.element?.classList.add("button");
    this.element?.classList.add(`${this.props.class}`);
    this.element?.setAttribute("type", props.type === "submit" ? "submit" : "button");
    props.form && this.element?.setAttribute("form", props.form);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
