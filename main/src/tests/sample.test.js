const request = require("supertest");
const router = require("../server/routes/routes.js");
const express = require("express");
const db = require("../server/db/sql");
const app = express();
const userController = require("../server/controllers/userController");
const outageController = require("../server/controllers/outageController");
app.use("*", router);

let mockRequest = () => {
  const req = {};
  req.body = jest.fn().mockReturnValue(req);
  return req;
};

let mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

beforeAll((done) => {
  done();
});

describe("DELETE /delete", () => {
  test("Should respond with a 201 status code", async () => {
    let req = mockRequest();
    req.body.user_email = "username@test.com";
    req.body.user_password = "password";
    const res = mockResponse();
    await userController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("POST /signup", () => {
  //Save username and password to users table
  //Respond with 201 status code
  test("Should respond with a 201 status code", async () => {
    let req = mockRequest();
    req.body.user_email = "username@test.com";
    req.body.user_password = "password";
    const res = mockResponse();
    await userController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User Registered" });
  });

  test("Should respond with a 500 status code if user already exists", async () => {
    let req = mockRequest();
    req.body.user_email = "username@test.com";
    req.body.user_password = "password";
    const res = mockResponse();
    await userController.signup(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
  });
});

describe("POST /login", () => {
  //Respond with 201 status code
  //Return JSON user object
  test("Should respond with a 200 status code", async () => {
    let req = mockRequest();
    req.body.user_email = "username@test.com";
    req.body.user_password = "password";
    const res = mockResponse();
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("Should return JSON of user", async () => {
    let req = mockRequest();
    req.body.user_email = "username@test.com";
    req.body.user_password = "password";
    const res = mockResponse();
    await userController.login(req, res);
    expect(res.json).toHaveBeenCalledWith({
      user: { user_email: "username@test.com", user_password: "password" },
    });
  });
});

describe("GET /outages", () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/outages");
    expect(response.status).toBe(200);
  });

  test("Should return a JSON array of outages", async () => {
    const response = await request(app).get("/outages");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("POST /profile", () => {
  test("Should respond with a 200 status code regardless whether or not the user has reported any outages", async () => {
    let req = mockRequest();
    req.body.user_email = null;
    const res = mockResponse();
    await outageController.profilePage(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

afterAll((done) => {
  db.end();
  done();
});
