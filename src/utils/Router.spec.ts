import { expect } from "chai";

describe("Router", () => {
  it('Going to a new page should change the state of history', () => {
    window.history.pushState('/login', 'Login');
    window.history.pushState('/register', 'register');
    expect(window.history.length).to.eq(3);
  });
});