import Block from "../../utils/Block";
import Router from "../../utils/Router";
import template from "./SideBtn.tmpl";

interface Props {
  events?: {
    click: () => void;
  },
}

export default class SideBtn extends Block<Props> {
  constructor(props: Props) {
    super("div", {
      ...props,
      events: {
        click: () => this.back(),
      },
    });
    this.element?.classList.add("side-button");
  }

  back() {
    Router.getInstance().back();
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

