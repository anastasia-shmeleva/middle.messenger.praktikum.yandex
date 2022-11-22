import Block from "./Block";
import Router from "./Router";

export interface WithRouterProps {
  router: Router;
}

export function withRouter<P extends WithRouterProps>(tag: string, WrappedBlock: typeof Block<P>) {
  return class extends WrappedBlock {
    constructor(props: P) {
      super(tag, { ...props, router: Router });
    }
  };
}
