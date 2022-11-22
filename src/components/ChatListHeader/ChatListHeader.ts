import template from "./ChatListHeader.tmpl";
import Block from "../../utils/Block";

interface Props {
  avatar: string,
  events?: {
    click: () => void;
  },
}

export default class ChatListHeader extends Block<Props> {
  constructor(props: Props) {
    super("section", {
      ...props,
      // events: {
        // click: () => ,
      // },
    });
    this.element?.classList.add("chat-aside__header");
    this.element?.classList.add("chat-aside__item-group");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

}
