import Block from "../../utils/Block";
import template from "./Message.tmpl";

interface Props {
  class?: string,
  content: string,
  time: string,
}

export default class Message extends Block<Props> {
    constructor(props: Props) {
      super("div", props);
      this.element?.classList.add("message");
      this.props.class && this.element?.classList.add(`${this.props.class}`);
    }

    render(): DocumentFragment {
      return this.compile(template, this.props);
    }
}
