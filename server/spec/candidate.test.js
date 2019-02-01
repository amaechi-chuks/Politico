// import supertest from 'supertest';
// import chai from 'chai';
// import app from '../app';
// import candidateInput from './seed/candidate.data';

// const user2Token = { token: null };
// const { should, expect } = chai;
// should();
// const request = supertest(app);

// describe('All test cases for Politico application', () => {
//   describe('Test case for creating a candidate', () => {
//     it('should create return `200`status code if candidate does nor exist in database', (done) => {
//       request.post('/api/v1/candidate')
//         .set('req.headers.authorization', user2Token.token)
//         .send(candidateInput.candidateData1)
//         .end((err, res) => {
//           res.body.should.be.an('object');
//           done(err);
//         });
//     });
//     it('should create return `200`status code if candidate does nor exist in database', (done) => {
//       request.post('/api/v1/candidate')
//         .set('req.headers.authorization', user2Token.token)
//         .send(candidateInput.candidateData1)
//         .end((err, res) => {
//           expect(res.status).to.equal(500);
//           done(err);
//         });
//     });
//   });
// });
