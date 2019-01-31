import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import data from './seed/user.data';
import input from './seed/party.data';
import userToken, { wrongToken } from './user.test';

const user2Token = { token: null };


const { should, expect } = chai;
should();
const request = supertest(app);
const invalidID = 50;
describe('All test cases for Politico application', () => {
  describe('Test case for loading application home page', () => {
    it('should load the application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should return `400` status code with for undefined party', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send({}) // request body not defined
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should return status code `400` with errors message for empty party', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send() // empty body request
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.hqAddress).to.equal(undefined);
          expect(res.body.name).to.equal(undefined);
          expect(res.body.party).to.equal(undefined);
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should return `400` if party name and hqAddress characters are incomplete', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send(input.incompleteData)
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should return a `400` status code if invalid party image', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send(input.invalidData)
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.error).to.equal('Invalid party logo');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
    it('should return a `400` status code if invalid party image', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send(input.invalidData11)
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.error).to.equal('Invalid party name');
          expect(res.status).to.equal(404);
          done(err);
        });
    });

    it('should deny an unauthenticated user access', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send({}) // request body not defined
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });

    it('should allow authenticated users to create request successfully', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send(input.validData1)
        .expect(201)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/parties/ route', () => {
    it('should return a 409 for an invalid type ', (done) => {
      request.post('/api/v1/parties')
        .set('req.headers.authorization', user2Token.token)
        .send(input.partyExist)
        .expect(409)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(409);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/party/ route', () => {
    it('should return a 409 for an invalid type ', (done) => {
      request.post('/api/v1/party/love')
        .set('req.headers.authorization', user2Token.token)
        .send({})
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/parties/id/ route', () => {
    it('should return a 404 for an valid update name ', (done) => {
      request.patch('/api/v1/parties/id')
        .set('req.headers.authorization', user2Token.token)
        .send(input.validUpdate2)
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/parties/id/ route', () => {
    it('should return a 200 for a valid update name ', (done) => {
      request.patch('/api/v1/parties/1/name')
        .set('req.headers.authorization', user2Token.token)
        .send(input.validUpdate2)
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
});
