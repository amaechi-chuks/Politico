/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import inputs from './seed/user.data';

chai.use(chaiHttp);
const signupUrl = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/login';

let token;

describe('/POST api/v1/auth/signup', () => {
  it('should return status code 400 if firstName field is ommitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidfirstName1)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'firstName must be specified' });
        done(err);
      });
  });
  it('should return status code 400 if firstName field is ommitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidfirstName2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'You need to include a valid firstName' });
        done(err);
      });
  });
  it('should return status code 400 if lasttname field is ommitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidlastName1)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'lastName must be specified' });
        done(err);
      });
  });
  it('should return status code 400 if lastName is invalid', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidlastName2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'You need to include a valid last name' });
        done(err);
      });
  });
  it('should return status code 400 if email field is ommitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidEmail1)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'Email must be specified' });
        done(err);
      });
  });
  it('should return status code 400 if email is invalid', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidEmail2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'You need to include a valid email' });
        done(err);
      });
  });
  it('should return status code 400 if password field is ommitted', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidPassword1)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'Password field cannot be empty' });
        done(err);
      });
  });
  it('should return status code 400 if password is invalid', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidPassword2)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'hqAddress must be specify' });
        done(err);
      });
  });
  it('should return status code 400 if password length is less than 5', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send(inputs.invalidPassword3)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body).to.deep.equal({ status: 400, error: 'Password strength is too low' });
        done(err);
      });
  });
  it('should return status code 409 for already existing user', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'chuks',
        lastName: 'Owen',
        otherName: 'johns',
        email: 'amaechichuks2000@yahoo.com',
        password: 'chuks9mike',
        phoneNumber: '07064566559',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User with email already exist');
        done(err);
      });
  });
  it('should return status code 400 invalid phoneNumber', (done) => {
    chai
      .request(app)
      .post(signupUrl)
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'chuks',
        lastName: 'Owen',
        otherName: 'johns',
        email: 'amaechichuks2000@yahoo.com',
        password: 'chuks9mike',
        phoneNumber: '0706',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('User with email already exist');
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
  it('Should return `404` and deny access if wrong userName is entered', (done) => {
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
  it('should return 200 status code for successful sign in a user', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'amaechichuks2000@yahoo.com',
        password: 'fabulous26',
      })
    // eslint-disable-next-line consistent-return
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        if (err) { return done(err); }
        done();
      });
  });
  it('should return 404 status code for sign in user with a wrong email', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'danbader@mabel.com',
        password: 'lilian',
      })
    // eslint-disable-next-line consistent-return
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Sorry, the email account you provided does not exist');
        if (err) { return done(err); }
        done();
      });
  });
  it('should  should not sign in user with an empty password field', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'dan@yahoomabel.com',
        password: '   ',
      })
    // eslint-disable-next-line consistent-return
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Sorry, the email account you provided does not exist');
        if (err) { return done(err); }
        done();
      });
  });
  it('should  should not sign in user with wrong data field', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'danahoomabel.com',
        password: '   ',
      })
    // eslint-disable-next-line consistent-return
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('The email you provided is invalid');
        if (err) { return done(err); }
        done();
      });
  });
  it('should  should not sign in user with wrong data field', (done) => {
    chai
      .request(app)
      .post(loginUrl)
      .send({
        email: 'danahoomabel.com',
        password: '   ',
      })
    // eslint-disable-next-line consistent-return
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('The email you provided is invalid');
        if (err) { return done(err); }
        done();
      });
  });
});
