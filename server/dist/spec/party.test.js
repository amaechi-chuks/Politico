'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _partyModel = require('../model/partyModel');

var _partyModel2 = _interopRequireDefault(_partyModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

var url = '/api/v1/parties/';
var id = 2;
describe('Handle all GET requests on /api/v1/parties/ routes', function () {
  it('should return status 200 and all political parties for route api/v1/parties', function (done) {
    _chai2.default.request(_app2.default).get(url).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.deep.equal(_partyModel2.default);
      done(err);
    });
  });
  it('should return status 200 and a political party for route /api/v1/parties/:id', function (done) {
    _chai2.default.request(_app2.default).get('' + url + id).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data).to.deep.equal([_partyModel2.default[id - 1]]);
      done(err);
    });
  });
  it('should return a 404 for all invalid routes', function (done) {
    _chai2.default.request(_app2.default).get('/api/v1/party').end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body.error).to.be.equal('Wrong endpoint. Such endpoint does not exist');
      done(err);
    });
  });
});

describe('Handle POST requests on /api/v1/parties/ route', function () {
  it('Should have a status 201 for creating new political party', function (done) {
    var party = {
      name: 'All Progressive Alliance',
      hqAddress: '9 Atiba Ikeja',
      logoUrl: 'apga.png'
    };
    _chai2.default.request(_app2.default).post(url).send(party).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.body.data[0].name).to.be.equal(party.name);
      expect(res.body.data[0].hqAddress).to.be.equal(party.hqAddress);
      expect(res.body.data[0].logoUrl).to.be.equal(party.logoUrl);
      done(err);
    });
  });
  it('Should have a status 404 for invalid name while creating political party', function (done) {
    var party = {
      name: 99,
      hqAddress: '55 Brainbox Rd Aba',
      logoUrl: 'aba.png'
    };
    _chai2.default.request(_app2.default).post(url).send(party).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({
        status: 404,
        error: 'Invalid party name'
      });
      done(err);
    });
  });
  it('Should have a status 400 for empty name while creating political party', function (done) {
    var party = {
      name: '',
      hqAddress: '55 Brainbox Rd Aba',
      logoUrl: 'aba.png'
    };
    _chai2.default.request(_app2.default).post(url).send(party).end(function (err, res) {
      expect(res).to.have.status(404);
      expect(res.body).to.deep.equal({
        status: 404,
        error: 'Party name must be specified'
      });
      done(err);
    });
  });
  it('Should have a status 404 for empty hqAddress while creating political party', function (done) {
    var party = {
      name: 'Youth Alliance Accord',
      hqAddress: '',
      logoUrl: 'chuks.png'
    };
    _chai2.default.request(_app2.default).post(url).send(party).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.deep.equal({
        status: 400,
        error: 'hqAddress must be specified'
      });
      done(err);
    });
  });
  it('Should have a status 400 for empty logoUrl while creating political party', function (done) {
    var party = {
      name: 'Youth Alliance Accord',
      hqAddress: 'Ayanleye Close Ogba, Lagos',
      logoUrl: ''
    };
    _chai2.default.request(_app2.default).post(url).send(party).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.deep.equal({
        status: 400,
        error: 'Party Logo must be specified'
      });
      done(err);
    });
  });
});

describe('Test for PATCH methods in updating party name records', function () {
  it('Should have a status of 200 and successfully UPDATE the party name', function (done) {
    var newName = { name: 'Hope Accord' };
    _chai2.default.request(_app2.default).patch('' + url + id + '/name').send(newName).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal({
        status: 200,
        data: res.body.data
      });
      done(err);
    });
  });
});

describe('Test for DELETE methods in deleting a political party records', function () {
  it('Should have a status of 200 and successfully delete the party records', function (done) {
    _chai2.default.request(_app2.default).delete('' + url + id).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.data[0].id).to.equal(id);
      expect(res.body.data[0].message).to.equal('Party record has been deleted');
      expect(res.body).to.deep.equal({
        status: 200,
        data: res.body.data
      });
      done(err);
    });
  });
});