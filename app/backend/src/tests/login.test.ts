import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";
import { start } from "repl";
import { request } from "http";

chai.use(chaiHttp);

const { expect } = chai;

describe("Login Integrations", () => {
  it("Success case test", async function () {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
        email: "admin@admin.com",
        password: "secret_admin",
      });
  
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("object");
    expect(chaiHttpResponse.body).to.have.property("token");
    
  });

    it("Fail case test One", async function () {
        const chaiHttpResponseErrorOne = await chai.request(app).post("/login").send({
            email: "",
            password: "",
          });
        expect(chaiHttpResponseErrorOne.status).to.be.equal(400);
        expect(chaiHttpResponseErrorOne.body).to.be.an("object");
        expect(chaiHttpResponseErrorOne.body).to.have.property("message");
        expect(chaiHttpResponseErrorOne.body.message).to.be.equal(
            "All fields must be filled"
        );

    });

    it("Fail case test Two", async function () {
        const chaiHttpResponseErrorTwo = await chai.request(app).post("/login").send({
            email: "admin@admi.com",
            password: "secret_admin",
          });
      
          expect(chaiHttpResponseErrorTwo.status).to.be.equal(401);
          expect(chaiHttpResponseErrorTwo.body).to.be.an("object");
          expect(chaiHttpResponseErrorTwo.body).to.have.property("message");
          expect(chaiHttpResponseErrorTwo.body.message).to.be.equal(
            "Invalid email or password"
          );
    });

    it("role success test", async function () {
        const chaiHttpResponse = await chai.request(app).post("/login").send({
            email: "admin@admin.com",
            password: "secret_admin",
          });

        const chaiHttpResponse2 = await chai
            .request(app)
            .get("/login/role")
            .set("Authorization", `${chaiHttpResponse.body.token}`)
            .send();

        expect(chaiHttpResponse2.status).to.be.equal(200);
        expect(chaiHttpResponse2.body).to.be.an("object");
        expect(chaiHttpResponse2.body).to.have.property("role");
        expect(chaiHttpResponse2.body.role).to.be.equal("admin");
    });

    it("role fail test", async function () {
        const chaiHttpResponse3 = await chai
            .request(app)
            .get("/login/role")
            .set("Authorization", ``)
            .send();

        expect(chaiHttpResponse3.status).to.be.equal(401);
        expect(chaiHttpResponse3.body).to.be.an("object");
        expect(chaiHttpResponse3.body).to.have.property("message");
        expect(chaiHttpResponse3.body.message).to.be.equal("Token not found");

    });



 
});
