import Block from "./Block";
import { assert, expect } from 'chai';

interface Props {
  prop?: string
}

class DummyComponent extends Block<Props> {
  constructor(props: Props) {
    super("div", props);
  }

  render(): DocumentFragment {
    return this.compile("mock text", this.props);
  }
}

const block = new DummyComponent({ prop: "oldP"});


describe("Block", () => {
  it("Render returns correct text", () => {
    assert.equal(block.getContent()!.innerHTML, "mock text");
  });

  it("componentDidUpdate() compares props and returns false if they are not equal", () => {
    const oldProps = block.props
    const newProps = { prop: "newP" }
    expect(block.componentDidUpdate(oldProps, newProps)).to.false;
  });
});
