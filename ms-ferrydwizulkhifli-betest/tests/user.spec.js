const supertest = require("supertest");
const { app } = require("../server");
const mongoose = require("mongoose");
const { response } = require("express");

describe("User API", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/register", () => {
    it("should be able user register", async () => {
      const result = await supertest(app).post("/api/register").send({
        fullName: "rafir",
        emailAddress: "rafir@gmail.com",
        registrationNumber: "082243642323466",
        password: "password",
      });
      console.log(result.body)
      expect(result.status).toBe(201)
    });
  });

  describe("POST /api/login", () => {
    it("should be able user login", async () => {
      const result = await supertest(app).post("/api/login").send({
        userName: "mama410",
        password: "password",
      });
      console.log(result.body)
      expect(result.status).toBe(200)
    });
  });
  
});
