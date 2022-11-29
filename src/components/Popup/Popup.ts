import Block from "../../utils/Block";
import template from "./Popup.tmpl"

export interface Props {
  title: string;
  content: Block;
  button_save: Block;
  button_cancel: Block;
  class?: string;
  events?: {
    submit: (e: SubmitEvent) => void;
    click: (e: Event) => void
  };
}

export class Popup extends Block<Props> {
  constructor(props: Props) {
    super("div", { ...props });
    this.element?.classList.add("popup");
    this.element?.classList.add(`${this.props.class}`);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Popup;