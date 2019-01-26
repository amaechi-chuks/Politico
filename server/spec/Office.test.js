import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import officeDb from '../model/officeModel';

chai.use(chaiHttp);
const { expect } = chai;
const url = '/api/v1/offices/';
const id = 2;

describe('Handle all GET requests on /api/v1/offices/ routes', () => {
  it('should return status 200 and all Political offices for route api/v1/offices', (done) => {
    chai
      .request(app)
      .get(url)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal(officeDb);
        done(err);
      });
  });
  it('should return status 200 and a Political office for route /api/v1/offices/:id', (done) => {
    chai
      .request(app)
      .get(`${url}${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.deep.equal([officeDb[id - 1]]);
        done(err);
      });
  });
  it('should return a 404 for all invalid routes', (done) => {
    chai
      .request(app)
      .get('/api/v1/office')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.be.equal('Wrong endpoint. Such endpoint does not exist');
        done(err);
      });
  });
});

describe('Handle POST requests on /api/v1/offices/ route', () => {
  it('Should have a status 201 for creating new  office', (done) => {
    const office = {
      name: 'Presidency',
      type: 'federal',

    };
    chai
      .request(app)
      .post(url)
      .send(office)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data[0].name).to.be.equal(office.name);
        expect(res.body.data[0].type).to.be.equal(office.type);
        done(err);
      });
  });
  it('Should have a status 404 for invalid name while creating  office', (done) => {
    const office = {
      name: 99,
      type: 'legislative',

    };
    chai
      .request(app)
      .post(url)
      .send(office)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('Should have a status 404 for empty name while creating a political office', (done) => {
    const office = {
      name: '',
      type: 'federal',

    };
    chai
      .request(app)
      .post(url)
      .send(office)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done(err);
      });
  });
  it('Should have a status 404 for empty type while creating a political office', (done) => {
    const office = {
      name: 'house of rep',
      type: '',

    };
    chai
      .request(app)
      .post(url)
      .send(office)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Type must be specified',
        });
        done(err);
      });
  });
  it('Should have a status 404 for invalid office type while creating a political office', (done) => {
    const office = {
      name: 'Youth head',
      type: 'senate',
    };
    chai
      .request(app)
      .post(url)
      .send(office)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({
          status: 404,
          error: 'Invalid office type',
        });
        done(err);
      });
  });
});
