import Block from "../../utils/Block";
import template from "./ChatPreview.tmpl";

interface Props {
  avatar: string | null,
  name: string,
  message: string,
  time: string,
  quantity: number,
  events: {
    click: (e: Event) => void;
  },
}

export default class ChatPreview extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("chat-aside__body");
    this.element?.classList.add("chat-aside__item-group");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
