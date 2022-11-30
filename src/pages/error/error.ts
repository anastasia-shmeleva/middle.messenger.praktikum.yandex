import Block from '../../utils/Block';
import Error from '../../components/Error/Error';
import template from './error.tmpl';

interface Props {
  errorCode: string,
  description: string,
  link: string,
}

export class Error500 extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
  
  init(): void {
    this.children.error = new Error({
      errorCode: "500",
      description: "We are already working on it",
      link: "/messenger",
    });

    super.init();
  }
}

export class Error404 extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
  
  init(): void {
    this.children.error = new Error({
      errorCode: "404",
      description: "Not found",
      link: "/messenger",
    });

    super.init();
  }
}
