const request = require("supertest");
const app = require("../../src/app");
const database = require("../../src/database");
const UserModel = require("../../src/database/models/users");

const currentDate = new Date();

const userData = {
  name: "Test User",
  nickname: "testuser",
  gender: "male",
  name: "Clark",
  active: true,
};

function initializeUsers() {
  const validUser = new UserModel(userData);
  validUser.save({ validateBeforeSave: false });
}

describe("Users route", () => {
  beforeAll(() => {
    database.connect();
    users = initializeUsers();
  });

  afterAll((done) => {
    UserModel.deleteMany({}, () => {
      database.disconnect(done);
    });
  });

  it("should list all the users", async (done) => {
    return request(app)
      .get("/users")
      .then((response) => {
        expect(response).toHaveProperty("statusCode", 200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject(
          expect.objectContaining(userData)
        );
        done();
      });
  });
});
