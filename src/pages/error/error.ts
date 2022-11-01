import Block from '../../utils/Block';
import template from './error.tmpl';

interface Props {
  errorCode: string,
  description: string,
  link: string,
}

class Error extends Block<Props> {
  constructor(props: Props) {
      super('div', props);

      this.element?.classList.add('service-error');
  }
  render(): DocumentFragment {
      return this.compile(template, this.props);
  }
}

export const Error500 = new Error({
  errorCode: "500",
  description: "We are already working on it",
  link: "/chats",
});

export const Error404 = new Error({
  errorCode: "404",
  description: "Not found",
  link: "/chats",
});
