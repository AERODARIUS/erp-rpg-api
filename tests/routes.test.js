const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");

describe("Home page", () => {
  afterAll((done) => {
    mongoose.disconnect(function () {
      server.close(function () {
        done();
      });
    });
  });

  it("should describe the endpoint", async (done) => {
    const res = await request(server).get("/");
    expect(res).toHaveProperty("statusCode", 200);
    expect(res).toHaveProperty("body", {});
    expect(res).toHaveProperty("text", "Here start your journey.");
    done();
  });
});
