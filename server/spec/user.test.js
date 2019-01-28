import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import inputs from './seed/user.data';

chai.use(chaiHttp);
const { should, expect } = chai;
should();
export const request = supertest(app);

export const wrongToken = 'ThisIsAWrongToken';


describe('All Test cases for user Register', () => {
  describe('All Test cases for new user Register', () => {
    it('Should return `201` for unique email signups', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.validInput1)
        .expect(201)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.data[0]).to.haveOwnProperty('token');
          done(err);
        });
    });
  });
  describe('/POST api/v1/auth/signup', () => {
    it('should return `400` if some fields are undefined', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.emptyData)
        .expect(400)
        .end((err, res) => {
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(400);
          done(err);
        });
    });
  });
  describe('/POST api/v1/auth/signup', () => {
    it('Should return `500` if password is not hashed', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send({})
        .expect(400)
        .end((err, res) => {
          expect(res.body.password).to.equal(undefined);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('/POST api/v1/auth/signup', () => {
    it('should return `400` status code with errors message for empty request', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.emptyData)
        .expect(400)
        .end((err, res) => {
          expect(res.body.firstname).to.eql(undefined);
          expect(res.body.lastname).to.eql(undefined);
          expect(res.body.email).to.eql(undefined);
          expect(res.body.password).to.eql(undefined);
          expect(res.body.phonenumber).to.eql(undefined);
          expect(res.body.passporturl).to.eql(undefined);
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
});
