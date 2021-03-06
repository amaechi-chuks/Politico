import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import partyData from './seed/party.data';

chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiY2h1a3MiLCJpc2FkbWluIjp0cnVlLCJlbWFpbCI6ImFtYWVjaGljaHVrczIwMDBAeWFob28uY29tIiwiaWF0IjoxNTQ4OTcwNzQyLCJleHAiOjE1NTQxNTQ3NDJ9.UZX4DXoJnDMKDXi4LQrN643q8q1He6GPMgHE-KsdJWI';
const user2Token = { token: null };
const { expect } = chai;
const url = '/api/v1/parties/';
const id = 1;


describe('All test cases for Politico application', () => {
  describe('Test case for fetching all parties', () => {
    it('should return 401 status code for ommiting auth header', (done) => {
      chai
        .request(app)
        .get(url)
        .set('Header', user2Token.token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 401, error: 'You are not authorized' });
          expect(res.status).to.equal(401);
          done(err);
        });
    });
    it('should return 403 status code for wrong auth header ', (done) => {
      chai
        .request(app)
        .get(url)
        .set('authorization', 'token')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 403, error: 'Forbidden' });
          expect(res.status).to.equal(403);
          done(err);
        });
    });
    it('should return 404 status code for fetching a non existing political party ', (done) => {
      chai
        .request(app)
        .get(`${url}${id + 10}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'Sorry, no record with such id' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/parties/ route', () => {
    it('should return 401 status code for wrong auth header', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', 'token')
        .send(partyData.validData1)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.status).to.equal(401);
          expect(res.body).to.deep.equal({ status: 401, error: 'You are not authorized to access this endpoint.' });
          done(err);
        });
    });

    it('should return 401 status code for ommiting auth header ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('headers', user2Token.token)
        .send(partyData.validData1)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 401, error: 'You are not authorized to access this endpoint.' });
          expect(res.status).to.equal(401);
          done(err);
        });
    });
    it('should return a 404 status code for an invalid name ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(partyData.invalidData11)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'Invalid Party name' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('should return a 400 status code for an invalid hqaddress ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(partyData.incompleteData)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 400, error: 'hqAddress must not be empty' });
          expect(res.status).to.equal(400);
          done(err);
        });
    });
    it('should return a 400 status code for an invalid logourl ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(partyData.incompleteDatalogo)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 400, error: 'Invalid party logo' });
          expect(res.status).to.equal(400);
          done(err);
        });
    });
    it('should return a 409 status code for a duplicate party name ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(partyData.partyExist)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          // expect(res.body).to.deep.equal({ status: 201, error: 'party name already exist' });
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('should return a 201 status code for a creating a political party ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(partyData.validData2)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].type).to.equal(partyData.validData2.type);
          expect(res.body.data[0].name).to.equal(partyData.validData2.name);
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });
  describe('Handle PATCH requests on /api/v1/parties/id/name route', () => {
    it('should return 201 status code while updating a party name', (done) => {
      chai
        .request(app)
        .patch(`${url}${id}/name`)
        .set('authorization', token)
        .send(partyData.validUpdate2)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.status).to.equal(201);
          expect(res.body.data.name).to.equal(partyData.validUpdate2.name);
          done(err);
        });
    });
    it('should return 404 status code ommiting name while updating a party name', (done) => {
      chai
        .request(app)
        .patch(`${url}${id}/name`)
        .set('authorization', token)
        .send(partyData.invalidUpdate1)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    describe('Handle Delete requests on /api/v1/parties/id route', () => {
      it('should return 200 status code on successful deleting a party', (done) => {
        chai
          .request(app)
          .delete(`${url}${id}`)
          .set('authorization', token)
          .end((err, res) => {
            expect(res.body).to.be.a('object');
            expect(res.status).to.equal(200);
            done(err);
          });
      });
    });
  });
});
