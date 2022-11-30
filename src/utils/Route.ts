import Block from "./Block";
import { RouteProps } from "./types";

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  root!.innerHTML = '';
  root!.append(block.getContent()!);
  return root;
}

export default class Route {
  private _block: Block | null = null;
  private _pathname: string;
  private _props: RouteProps;
  private _blockClass: new(...props: any) => Block;

  constructor(
    pathname: string, 
    view: new(...props: any) => Block, 
    props: RouteProps
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});
      render(this._props.rootQuery, this._block);
      return;
    } else {
      render(this._props.rootQuery, this._block);
    }

    this._block.show();
  }
}
