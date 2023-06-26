import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration', () => {
  it('should return all teams', async function() {
    const chaiHttpResponse = await chai.request(app).get("/teams");

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an("array");


  });

  it('should return a team by id', async function() {
    const chaiHttpResponse2 = await chai.request(app).get("/teams/1");

    expect(chaiHttpResponse2.status).to.be.equal(200);
    expect(chaiHttpResponse2.body).to.be.an("object");

    
  });

  it ('fail case test', async function() {
    const chaiHttpResponse3 = await chai.request(app).get("/teams/999");

    expect(chaiHttpResponse3.status).to.be.equal(404);
    expect(chaiHttpResponse3.body).to.deep.equal({ message: "Team 999 not found" });
  });

});
