import Block from "../../utils/Block";
import template from "./profileAction.tmpl";

interface Props {
  class?: string,
  link: string,
  name: string,
  events: {
    click: (e: Event) => void;
  },
}

export default class Action extends Block<Props> {
  constructor(props: Props) {
    super("span", props);
    this.element?.classList.add("profile__action");
    props.class && this.element?.classList.add(props.class);
  }
  
  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}