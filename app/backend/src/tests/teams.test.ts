import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../../src/database/models/TeamsModel';
import { teams, team } from '../tests/mocks/teamsMock';



import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration', () => {
  it('should return all books', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('should return a book by id', async function() {
    sinon.stub(TeamsModel, 'findOne').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

});
