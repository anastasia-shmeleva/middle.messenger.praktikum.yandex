import Block from "../../utils/Block";
import template from "./FormField.tmpl";
import { validate } from "../../utils/validate";

interface Props {
  label: string,
  type: string,
  value: string,
  name: string,
  events?: {
    focusin: (e: Event) => void;
    focusout: (e: Event) => void;
  },
}

export default class FormField extends Block<Props> {
  constructor(props: Props) {
    const events = {
      focusin: (e: Event): void => this.onFocus(e),
      focusout: (e: Event): void => this.onBlur(e),
    };

    super("div", { ...props, events });
    this.element?.classList.add("form__control");
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
