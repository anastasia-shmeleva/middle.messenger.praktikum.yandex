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
      click: (e: Event): void => this.handleClick(e),
    };
    super("section", { ...props, events });
    this.element?.classList.add("chat-main");
    props.stub && this.element?.classList.add("stub");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  handleClick = (e: Event): void => {
    const parentDropdown = (e.target! as HTMLElement).closest(".chats-main__actions-dots")
    const parentAvatar = (e.target! as HTMLElement).closest(".chats-main__avatar")
    
    if (parentDropdown) {
      document.querySelector(".dropdown")?.classList.toggle("visible")
    }

    if (parentAvatar) {
      document.querySelector(".popup.add-avatar")?.classList.toggle("visible")
    }
  };
}
