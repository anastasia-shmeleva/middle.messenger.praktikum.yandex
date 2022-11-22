import Block from "./Block";

interface Constructable<P extends Record<string, any>> {
  new (props: P): Block<P>;
}

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
  private _pathname;
  private _query;
  private _blockClass;
  
  constructor(pathname: string, blockClass: Constructable<any>, query: string) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._query = query;
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
      render(this._query, this._block);
      return;
    }

    this._block.show();
  }
}
