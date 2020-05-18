const request = require("supertest");
const app = require("../../src/app");
const database = require("../../src/database");
const UserModel = require("../../src/database/models/users");

const userData = {
  name: "Test User",
  nickname: "testuser",
  email: "test@user.com",
  gender: "male",
  active: true,
};
const otherUserData = {
  name: "Test User 2",
  nickname: "testuser2",
  email: "test2@user.com",
  password: "password2",
  gender: "male",
  active: true,
};

function initializeUsers() {
  const validUser = new UserModel(userData);
  validUser.save({ validateBeforeSave: false });
}

describe("Users route", () => {
  beforeAll(() => {
    database.connect();
    initializeUsers();
  });

  afterAll((done) => {
    UserModel.deleteMany({}, () => {
      database.disconnect(done);
    });
  });
  /*
  it("should allow to add users", async (done) => request(app)
    .post("/api/v1/users")
    .send(otherUserData)
    .set("Accept", "application/json")
    .then((response) => {
      expect(response.body).toMatchObject({});
      // expect(response).toHaveProperty("statusCode", 200);
      expect(response.body).toMatchObject(
        expect.objectContaining(userData),
      );
      done();
    }));
*/
  it("should list all the users", async (done) => request(app)
    .get("/api/v1/users")
    .then((response) => {
      expect(response).toHaveProperty("statusCode", 200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject(
        expect.objectContaining(userData),
      );
      done();
    }));

  it("should display specific user information", async (done) => {
    request(app)
      .get(`/api/v1/users/${userData.nickname}`)
      .then((response) => {
        expect(response).toHaveProperty("statusCode", 200);
        expect(response.body).toMatchObject(
          expect.objectContaining(userData),
        );
        done();
      });
  });

  it("should update user information", async (done) => {
    const newUserData = { name: "Pepe Grillo" };

    request(app)
      .put(`/api/v1/users/${userData.nickname}`)
      .send(newUserData)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.user).toMatchObject(
          expect.objectContaining(newUserData),
        );
        done();
      });
  });
});
