import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import officeData from './seed/office.data';

chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiY2h1a3MiLCJpc2FkbWluIjp0cnVlLCJlbWFpbCI6ImFtYWVjaGljaHVrczIwMDBAeWFob28uY29tIiwiaWF0IjoxNTQ4OTcwNzQyLCJleHAiOjE1NTQxNTQ3NDJ9.UZX4DXoJnDMKDXi4LQrN643q8q1He6GPMgHE-KsdJWI';
const user2Token = { token: null };
const { should, expect } = chai;
const url = '/api/v1/offices/';
const id = 1;
should();

describe('All test cases for Politico application', () => {
  describe('Test case for fetching all offices', () => {
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
    it('should return 200 status code for fetching all office ', (done) => {
      chai
        .request(app)
        .get(url)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].id).to.equal(1);
          expect(res.body.data[0].type).to.equal('federal');
          expect(res.body.data[0].name).to.equal('senate');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should return 200 status code for fetching a political office ', (done) => {
      chai
        .request(app)
        .get(`${url}${id}`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.data.id).to.equal(1);
          expect(res.body.data.type).to.equal('federal');
          expect(res.body.data.name).to.equal('senate');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should return 404 status code for fetching a non existing political office ', (done) => {
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
    it('should return 404 status code for a GET request with a wrong params ', (done) => {
      chai
        .request(app)
        .get(`${url}s`)
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'The id parameter must be a number' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('should return 404 status code for a GET request to a wrong endpoint ', (done) => {
      chai
        .request(app)
        .get('/offices')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'check documentation, "/docs"' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
  describe('Handle POST requests on /api/v1/offices/ route', () => {
    it('should return 401 status code for wrong auth header', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', 'token')
        .send(officeData.validData1)
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
        .send(officeData.validData1)
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
        .send(officeData.invalidName)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'Office must not be empty' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('should return a 404 status code for an invalid type ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(officeData.invalidType)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'Type must be specified' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
    it('should return a 409 status code for a duplicate office name ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(officeData.officeExist)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 409, error: 'office name already exist' });
          expect(res.status).to.equal(409);
          done(err);
        });
    });
    it('should return a 201 status code for a creating a political office ', (done) => {
      chai
        .request(app)
        .post(url)
        .set('authorization', token)
        .send(officeData.validData2)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body.data[0].type).to.equal(officeData.validData2.type);
          expect(res.body.data[0].name).to.equal(officeData.validData2.name);
          expect(res.status).to.equal(201);
          done(err);
        });
    });
    it('should return 404 status code for Post request to a wrong endpoint', (done) => {
      chai
        .request(app)
        .post('/offices')
        .set('authorization', token)
        .send(officeData.validData2)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 404, error: 'check documentation, "/docs"' });
          expect(res.status).to.equal(404);
          done(err);
        });
    });
  });
});
