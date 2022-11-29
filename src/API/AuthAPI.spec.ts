import chai, { expect } from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const data = {
  login: "Dan",
  password: "Qwerty12"
}

describe('Auth API', () => {
  it('it should login user', async () => {
    const res = await chai
      .request("https://ya-praktikum.tech/api/v2")
      .post("/auth/signin")
      .set("Content-Type", "application/json")
      .send(data)
      expect(res).to.have.status(200);
    }
  );
});