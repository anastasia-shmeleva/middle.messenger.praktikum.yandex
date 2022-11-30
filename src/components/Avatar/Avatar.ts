import Block from "../../utils/Block";
import template from "./Avatar.tmpl";

interface Props {
  avatar?: string,
  events?: {
    click: () => void;
  },
}

export default class Avatar extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("profile-avatar");
  }
  
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
