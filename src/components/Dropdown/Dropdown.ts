import Block from "../../utils/Block";
import template from "./Dropdown.tmpl"

export interface Props {
  events?: {
    click: (e: Event) => void
  };
}

export class Dropdown extends Block<Props> {
  constructor(props: Props) {
    super("div", { ...props });
    this.element?.classList.add("dropdown");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Dropdown;