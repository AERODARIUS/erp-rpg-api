const request = require("supertest");
const app = require("../src/app");

describe("Home page", () => {
  it("should describe the endpoint", async (done) => request(app)
    .get("/")
    .then((response) => {
      expect(response).toHaveProperty("statusCode", 200);
      expect(response).toHaveProperty("body", {});
      expect(response).toHaveProperty("text", "Here starts your journey.");
      done();
    }));

  it("should display 404 page when not found", async (done) => request(app)
    .get("/this-is-trash")
    .then((response) => {
      expect(response).toHaveProperty("statusCode", 404);
      expect(response).toHaveProperty("body", {});
      expect(response).toHaveProperty("text");
      expect(response.text).toContain("Error: Not Found??");
      done();
    }));
});
