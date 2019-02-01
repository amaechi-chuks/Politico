import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('All test cases for Politico application', () => {
  describe('Test case for default routes', () => {
    it('should return status code 200 for default endpoint / ', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 200, message: 'Welcome to Politico' });
          expect(res.status).to.equal(200);
          done(err);
        });
    });
    it('should return status code 200 for default endpoint /api/v1 ', (done) => {
      chai
        .request(app)
        .get('/api/v1')
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.deep.equal({ status: 200, message: 'Welcome to Politico API V1' });
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
});
