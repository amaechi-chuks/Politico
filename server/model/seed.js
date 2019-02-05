import winston from '../config/winston';
import HelperUtils from '../utility/helperUltis';
import createTables from './createTable';
import dropTables from './dropTable';
import databaseConnection from './databaseConnection';

const dropTablesQuery = dropTables;
const createTablesQuery = createTables;

const hashedPassword = HelperUtils.hashPassword('fabulous26');
const createUserQuery = `
    INSERT INTO users(firstName, lastName, otherName, email, phoneNumber, password) 
    VALUES('Chuks', 'Amaechi', 'frank', 'amaechichuks2000@yahoo.com', '07068566559', '${hashedPassword}') RETURNING *`;


const createParty = `
    INSERT INTO party(name, hqAddress, logoUrl) VALUES('all party', 'plot 5 adams', 
    'This is a red-flag message', 'apc.jpeg') RETURNING *`;

const createOffice = `
INSERT INTO office(type, name) VALUES('federal', 'legislative') RETURNING *`;

const createCandidate = `
    INSERT INTO candidate(office, party, candidate) VALUES('1', '1', '2') RETURNING *`;

const createVote = `
INSERT INTO vote(createdBy, office, body) VALUES('2', '1', 
'hello chuks') RETURNING *`;

const queries = `${dropTablesQuery}${createTablesQuery}${createUserQuery}${createParty}${createOffice}${createCandidate}${createVote}`;

databaseConnection.query(queries, (err) => {
  if (err) {
    winston.info('Error is', err);
  }
});
