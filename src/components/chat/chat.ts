import template from "./chat.tmpl";
import Block from "../../utils/Block";

interface Props {
  stub: string,
  empty: boolean,
  avatar: string,
  currentChatName: string,
}

export default class Chat extends Block<Props> {
  constructor(props: Props) {
    super("section", props);
    this.element?.classList.add("chat-main");
    props.empty && this.element?.classList.add("empty");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

}
