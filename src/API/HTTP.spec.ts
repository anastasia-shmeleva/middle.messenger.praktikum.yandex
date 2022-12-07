import HTTP from "./HTTP";
import { before, describe } from 'mocha';
import { expect } from "chai";

describe("Module for requests to API", () => {
  const baseUrl = "http://localhost:1234";

  before(() => {
    require("../../tests/serverMock/server");

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        expect(xhr.response).to.equal('{\n  "message": "Server is running"\n}');
      }
    };

    xhr.open("get", `${baseUrl}/mock`);
    xhr.send();
  });

  it("GET should return status 200", async () => {
    HTTP.BASE_URL = baseUrl;
    const http = new HTTP("/api");

    const response = await http.get("/test/get", {method: "GET"});

    expect(response).to.have.property("status").and.equal(200);
  });

});


