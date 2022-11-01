import Block from "../../utils/Block";
import template from "./button.tmpl";

interface Props {
  name: string,
}

export default class Button extends Block<Props> {
  constructor(props: Props) {
    super("button", props);
    this.element?.classList.add("button");
    this.element?.setAttribute("type", "submit");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
