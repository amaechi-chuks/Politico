import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import inputs from './seed/user.data';

chai.use(chaiHttp);
const { expect } = chai;
const signupUrl = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/login';

describe('All Test cases for user Registeration', () => {
  describe('/POST api/v1/auth/signup', () => {
    it('should return status code 400 if firstname field is ommitted', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.invalifFirstname1)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.deep.equal({ status: 400, error: 'firstname must be specified' });
          done(err);
        });
    });
    it('should return status code 400 if firstname field is ommitted', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.invalifFirstname2)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.deep.equal({ status: 400, error: 'You need to include a valid firstname' });
          done(err);
        });
    });
    it('should return status code 400 if lasttname field is ommitted', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.invalifLastname1)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.deep.equal({ status: 400, error: 'lastname must be specified' });
          done(err);
        });
    });
    it('should return status code 400 if lastname field is invalid', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.invalifLastname2)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body).to.deep.equal({ status: 400, error: 'You need to include a valid last name' });
          done(err);
        });
    });
  });
  describe('All Test cases for user login', () => {
    it('Should return `401` for empty user input', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.invalidEmailPassword)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should return `404` and deny access if wrong userName is not entered', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.noEmail)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should return `404` and deny access if wrong Password is not entered', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .set('Content-Type', 'application/json')
        .send(inputs.noPassword)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
});
