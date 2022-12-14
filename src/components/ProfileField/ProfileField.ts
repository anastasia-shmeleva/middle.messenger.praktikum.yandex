import Block from "../../utils/Block";
import { validate } from "../../utils/validate";
import template from "./ProfileField.tmpl";

interface Props {
  edit: boolean,
  label: string,
  class?: string,
  type?: string,
  name: string,
  value?: string,
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

export default class ProfileField extends Block<Props> {
  constructor(props: Props) {
    const events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };
    super("div", { ...props, events });
    this.element?.classList.add("profile-form__control");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  onFocus = (e: Event): void => {
    validate(e, this.element!, ".form__error", "show")
  };

  onBlur = (e: Event): void => {
    validate(e, this.element!, ".form__error", "show")
  };
}
