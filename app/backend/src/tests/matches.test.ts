import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Match API', () => {
    let token: string; // To store the authentication token
  
    beforeEach(async () => {
      const chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
        });
  
      token = chaiHttpResponse.body.token;
    });
  
    it('should retrieve matches', async () => {
      const chaiHttpResponse2 = await chai.request(app)
        .get('/matches')
        .set('Authorization', token)
        .send();
  
      expect(chaiHttpResponse2.status).to.be.equal(200);
      expect(chaiHttpResponse2.body).to.be.an('array');
    });
  
    it('should update match goals', async () => {
      const chaiHttpResponse3 = await chai.request(app)
        .patch('/matches/1')
        .set('Authorization', token)
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        });
  
      expect(chaiHttpResponse3.status).to.be.equal(200);
      expect(chaiHttpResponse3.body).to.be.an('object');
      expect(chaiHttpResponse3.body).to.have.property('message');
      expect(chaiHttpResponse3.body.message).to.be.equal('Updated');
    });
  
    it('should finish a match', async () => {
      const chaiHttpResponse4 = await chai.request(app)
        .patch('/matches/1/finish')
        .set('Authorization', token)
        .send();
  
      expect(chaiHttpResponse4.status).to.be.equal(200);
      expect(chaiHttpResponse4.body).to.be.an('object');
      expect(chaiHttpResponse4.body).to.have.property('message');
      expect(chaiHttpResponse4.body.message).to.be.equal('Finished');
    });
  
    it('should create a match', async () => {
      const chaiHttpResponse5 = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 0,
          awayTeamGoals: 0,
        });
  
      expect(chaiHttpResponse5.status).to.be.equal(201);
      expect(chaiHttpResponse5.body).to.be.an('object');
      expect(chaiHttpResponse5.body).to.have.property('id');
      expect(chaiHttpResponse5.body).to.have.property('homeTeamId');
      expect(chaiHttpResponse5.body).to.have.property('awayTeamId');
      expect(chaiHttpResponse5.body).to.have.property('homeTeamGoals');
      expect(chaiHttpResponse5.body).to.have.property('awayTeamGoals');
      expect(chaiHttpResponse5.body).to.have.property('inProgress');
    });
  
    it('should not create a match with two equal teams', async () => {
      const chaiHttpResponse6 = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
          homeTeamGoals: 0,
          awayTeamGoals: 0,
        });
  
      expect(chaiHttpResponse6.status).to.be.equal(422);
      expect(chaiHttpResponse6.body).to.be.an('object');
      expect(chaiHttpResponse6.body).to.have.property('message');
      expect(chaiHttpResponse6.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });
  
    it('should not create a match with a non-existent team', async () => {
      const chaiHttpResponse7 = await chai.request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({
         homeTeamId: 1,
         awayTeamId: 999,
         homeTeamGoals: 0,
         awayTeamGoals: 0,
        });

    expect(chaiHttpResponse7.status).to.be.equal(404);
    expect(chaiHttpResponse7.body).to.be.an('object');
    expect(chaiHttpResponse7.body).to.have.property('message');
    expect(chaiHttpResponse7.body.message).to.be.equal('There is no team with such id!');
  });

  it('should retrieve in-progress matches', async () => {
    const chaiHttpResponse8 = await chai.request(app)
      .get('/matches')
      .query({ inProgress: true })
      .set('Authorization', token)
      .send();

    expect(chaiHttpResponse8.status).to.be.equal(200);
    expect(chaiHttpResponse8.body).to.be.an('array');
  });
});
