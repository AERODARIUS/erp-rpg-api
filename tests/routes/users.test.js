const request = require("supertest");
const app = require("../../src/app");
const database = require("../../src/database");
const UserModel = require("../../src/database/models/user");
const userData = { name: "Test User" };

function initializeUsers() {
  const validUser = new UserModel(userData);
  validUser.save();
}

describe("Users route", () => {
  beforeAll(() => {
    database.connect();
    users = initializeUsers();
  });

  afterAll((done) => {
    UserModel.remove({}, () => {
      database.disconnect(done);
    });
  });

  it("should list all the users", async (done) => {
    return request(app)
      .get("/users")
      .then((response) => {
        expect(response).toHaveProperty("statusCode", 200);
        expect(response).toHaveProperty("body", [userData]);
        done();
      });
  });
});
