import Block from "../../utils/Block";
import template from "./form.tmpl";

interface Props {
  name: string;
  fields: Block[];
  button: Block;
  linkTitle: string;
  link: string;
  events?: {
    submit: (e: SubmitEvent) => void;
  };
}

export default class Form extends Block<Props> {
  constructor(props: Props) {
    const events = {
      submit: (e: Event) => console.log(e)
    };
    super("form", { ...props, events });

    this.element?.classList.add("form");
    this.element?.classList.add("login");
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
