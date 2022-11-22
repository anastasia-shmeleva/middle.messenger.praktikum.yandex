import Block from "../../utils/Block";
import template from "./Error.tmpl";

export interface Props {
  errorCode: string,
  description: string,
  link: string,
}

export default class Error extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
    this.element?.classList.add("error-wrapper");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
