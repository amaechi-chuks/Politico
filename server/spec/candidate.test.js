import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;


const loginUrl = '/api/v1/auth/login';
const signupUrl = '/api/v1/auth/signup';
const partyUrl = './api/v1/parties';
const officeUrl = './api/v1/offices';
const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiY2h1a3MiLCJpc2FkbWluIjp0cnVlLCJlbWFpbCI6ImFtYWVjaGljaHVrczIwMDBAeWFob28uY29tIiwiaWF0IjoxNTQ4OTcwNzQyLCJleHAiOjE1NTQxNTQ3NDJ9.UZX4DXoJnDMKDXi4LQrN643q8q1He6GPMgHE-KsdJWI';
let token;
describe('POST Requests', () => {
  describe('POST url', () => {
    it('should sign in a user', (done) => {
      chai
        .request(app)
        .post(loginUrl)
        .send({
          email: 'amaechichuks2000@yahoo.com',
          password: 'fabulous26',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          token = res.body.data[0].token;
          if (err) { return done(err); }
          done();
        });
    });
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should create a new user', (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          firstname: 'Jacob',
          lastname: 'Mike',
          othername: 'johns',
          email: 'mkw4ppp54ees@ytedx.com',
          password: 'chuk4s9mike',
          passporturl: 'johns.jpeg',
          phonenumber: '07064566559',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.be.an('object');
          if (err) { return done(err); }
          done();
        });
    });
  });
});
