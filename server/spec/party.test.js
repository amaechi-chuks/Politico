import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import partyDb from '../model/partyModel';

chai.use(chaiHttp);
const { expect } = chai;
const url = '/api/v1/parties/';
const id = 2;
describe('Handle all GET requests on /api/v1/parties/ routes', () => {
  it('should return status 200 and all political parties for route api/v1/parties', (done) => {
    chai
      .request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal(partyDb);
        done(err);
      });
  });
  it('should return status 200 and a political party for route /api/v1/parties/:id', (done) => {
    chai
      .request(app)
      .get(`${url}${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal([partyDb[id - 1]]);
        done(err);
      });
  });
  it('should return a 404 for all invalid routes', (done) => {
    chai
      .request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.equal('Wrong endpoint. Such endpoint does not exist');
        done(err);
      });
  });
});

describe('Handle POST requests on /api/v1/parties/ route', () => {
  it('Should have a status 201 for creating new political party', (done) => {
    const party = {
      name: 'All Progressive Alliance',
      hqAddress: '9 Atiba Ikeja',
      logoUrl: 'apga.png',
    };
    chai
      .request(app)
      .post(url)
      .send(party)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data[0].name).to.be.equal(party.name);
        expect(res.body.data[0].hqAddress).to.be.equal(party.hqAddress);
        expect(res.body.data[0].logoUrl).to.be.equal(party.logoUrl);
        done(err);
      });
  });
  it('Should have a status 404 for invalid name while creating political party', (done) => {
    const party = {
      name: 99,
      hqAddress: '55 Brainbox Rd Aba',
      logoUrl: 'aba.png',
    };
    chai
      .request(app)
      .post(url)
      .send(party)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Invalid party name',
        });
        done(err);
      });
  });
  it('Should have a status 400 for empty name while creating political party', (done) => {
    const party = {
      name: '',
      hqAddress: '55 Brainbox Rd Aba',
      logoUrl: 'aba.png',
    };
    chai
      .request(app)
      .post(url)
      .send(party)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Party name must be specified',
        });
        done(err);
      });
  });
  it('Should have a status 404 for empty hqAddress while creating political party', (done) => {
    const party = {
      name: 'Youth Alliance Accord',
      hqAddress: '',
      logoUrl: 'chuks.png',
    };
    chai
      .request(app)
      .post(url)
      .send(party)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          status: 400,
          error: 'hqAddress must be specified',
        });
        done(err);
      });
  });
  it('Should have a status 400 for empty logoUrl while creating political party', (done) => {
    const party = {
      name: 'Youth Alliance Accord',
      hqAddress: 'Ayanleye Close Ogba, Lagos',
      logoUrl: '',
    };
    chai
      .request(app)
      .post(url)
      .send(party)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({
          status: 400,
          error: 'Party Logo must be specified',
        });
        done(err);
      });
  });
});

describe('Test for PATCH methods in updating party name records', () => {
  it('Should have a status of 200 and successfully UPDATE the party name', (done) => {
    const newName = { name: 'Hope Accord' };
    chai
      .request(app)
      .patch(`${url}${id}/name`)
      .send(newName)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({
          status: 200,
          data: res.body.data,
        });
        done(err);
      });
  });
});

describe('Test for DELETE methods in deleting a political party records', () => {
  it('Should have a status of 200 and successfully delete the party records', (done) => {
    chai
      .request(app)
      .delete(`${url}${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data[0].id).to.equal(id);
        expect(res.body.data[0].message).to.equal('Party record has been deleted');
        expect(res.body).to.deep.equal({
          status: 200,
          data: res.body.data,
        });
        done(err);
      });
  });
});
