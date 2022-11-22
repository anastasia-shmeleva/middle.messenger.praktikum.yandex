import Block from "../../utils/Block";
import template from "./SideBtn.tmpl";
import { WithRouterProps, withRouter } from "../../utils/withRouter";

interface Props extends WithRouterProps{
  events?: {
    click: () => void;
  },
}

export class SideBtn extends Block<Props> {
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
    this.props.router.back();
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export const SideButton = withRouter("div", SideBtn as Block<Props>);
