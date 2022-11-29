import template from "./Chat.tmpl";
import Block from "../../utils/Block";

interface Props {
  stub: boolean,
  dropdown?: Block,
  avatar?: string | null,
  currentChatName?: string,
  events?: {
    click: (e: Event) => void
  }
}

export default class Chat extends Block<Props> {
  constructor(props: Props) {
    const events = {
      click: (e: Event): void => this.openDropdown(e),
    };
    super("section", { ...props, events });
    this.element?.classList.add("chat-main");
    props.stub && this.element?.classList.add("stub");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  openDropdown = (e: Event): void => {
    const parent = (e.target! as HTMLElement).closest(".chats-main__actions-dots")
    if (parent) {
      document.querySelector(".dropdown")?.classList.toggle("visible")
    }
  };
}
