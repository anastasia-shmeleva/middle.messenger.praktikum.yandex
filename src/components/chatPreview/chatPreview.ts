import Block from "../../utils/Block";
import template from "./chatPreview.tmpl";

interface Props {
  avatar?: string,
  name: string,
  message: string,
  time: string,
  quantity?: string,
  events: {
    click: (e: Event) => void;
  },
}

export default class chatPreview extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("chat-aside__body");
    this.element?.classList.add("chat-aside__item-group");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}