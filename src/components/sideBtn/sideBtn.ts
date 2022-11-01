import Block from "../../utils/Block";
import template from "./sideBtn.tmpl";

interface Props {
  name: void,
}

export default class SideBtn extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("side-button");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}