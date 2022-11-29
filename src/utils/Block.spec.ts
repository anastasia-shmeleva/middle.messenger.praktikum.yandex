import { expect } from "chai";
import Block from "./Block";
import sinon from "sinon";

interface Props {}

const mockEventBus = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

describe("Block", () => {
  class ComponentMock extends Block<Props> {
    constructor(props: Props) {
      super("div", props);
    }
  }

  it("should fire init event", () => {
    new ComponentMock({});
    expect(mockEventBus.emit.calledWith("init")).to.eq(true);
  });
});
