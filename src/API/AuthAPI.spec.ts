import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import HTTP from "../API/HTTP";

chai.use(chaiHttp);

const data = {
  login: "Dan",
  password: "Qwerty12"
}

describe('Auth API', () => {
  it('it should login user', async () => {
    const res = await chai
      .request(HTTP.BASE_URL)
      .post("/auth/signin")
      .set("Content-Type", "application/json")
      .send(data)
      expect(res).to.have.status(200);
    }
  );
});
