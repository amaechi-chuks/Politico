import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import officeData from './seed/office.data';

const user2Token = { token: null };
const { should, expect } = chai;
should();
const request = supertest(app);

describe('All test cases for Politico application', () => {
  describe('Test case for creating a political party', () => {
    it('should create return `201` status code for creating a political party', (done) => {
      request.get('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.validData1)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should create return `201` status code for creating a political party', (done) => {
      request.get('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.validData2)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return a 404 for all undefined ', (done) => {
      request.get('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.emptyData)
        .expect(200)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return a 404 for an invalid type ', (done) => {
      request.post('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.invalidType)
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return a 404 for an invalid type ', (done) => {
      request.post('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.invalidName)
        .expect(404)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return a 404 for an invalid type ', (done) => {
      request.post('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send(officeData.officeExist)
        .expect(201)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return a 404 for an invalid id ', (done) => {
      request.get('/api/v1/offices/love')
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
  describe('Handle POST requests on /api/v1/offices route', () => {
    it('should return a  for an invalid id ', (done) => {
      request.post('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send({
          type: 'federal',
          name: 'legislative',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices route', () => {
    it('should return a  for an invalid id ', (done) => {
      request.post('/api/v1/offices')
        .set('req.headers.authorization', user2Token.token)
        .send({
          type: '',
          name: '',
        })
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Type must be specified');
          expect(res.body).to.be.an('object');
          done(err);
        });
    });
  });
});
