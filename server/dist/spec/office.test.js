

const _chai = require('chai');

const _chai2 = _interopRequireDefault(_chai);

const _chaiHttp = require('chai-http');

const _chaiHttp2 = _interopRequireDefault(_chaiHttp);

const _app = require('../app');

const _app2 = _interopRequireDefault(_app);

const _officeModel = require('../model/officeModel');

const _officeModel2 = _interopRequireDefault(_officeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
const expect = _chai2.default.expect;

const url = '/api/v1/offices/';
const id = 2;

describe('Handle all GET requests on /api/v1/offices/ routes', () => {
  it('should return status 200 and all Political offices for route api/v1/offices', (done) => {
    _chai2.default.request(_app2.default).get(url).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.deep.equal(_officeModel2.default);
      done(err);
    });
  });
  it('should return status 200 and a Political office for route /api/v1/offices/:id', (done) => {
    _chai2.default.request(_app2.default).get(`${url}${id}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.data).to.deep.equal([_officeModel2.default[id - 1]]);
      done(err);
    });
  });
  it('should return a 404 for all invalid routes', (done) => {
    _chai2.default.request(_app2.default).get('/api/v1/office').end((err, res) => {
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
    _chai2.default.request(_app2.default).post(url).send(office).end((err, res) => {
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
    _chai2.default.request(_app2.default).post(url).send(office).end((err, res) => {
      expect(res).to.have.status(404);
      done(err);
    });
  });
  it('Should have a status 404 for empty name while creating a political office', (done) => {
    const office = {
      name: '',
      type: 'federal',

    };
    _chai2.default.request(_app2.default).post(url).send(office).end((err, res) => {
      expect(res).to.have.status(404);
      done(err);
    });
  });
  it('Should have a status 404 for empty type while creating a political office', (done) => {
    const office = {
      name: 'house of rep',
      type: '',

    };
    _chai2.default.request(_app2.default).post(url).send(office).end((err, res) => {
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
    _chai2.default.request(_app2.default).post(url).send(office).end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({
        status: 404,
        error: 'Invalid office type',
      });
      done(err);
    });
  });
});
