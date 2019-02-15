const dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropParty = 'DROP TABLE IF EXISTS party CASCADE; ';
const dropOffice = 'DROP TABLE IF EXISTS office CASCADE; ';
const dropVote = 'DROP TABLE IF EXISTS vote CASCADE; ';
const dropRegister = 'DROP TABLE IF EXISTS candidate CASCADE; ';
const interestTable = 'DROP TABLE IF EXISTS interest CASCADE;';


const dropQuery = `${dropUsers}${dropParty}${dropOffice}${dropVote}${dropRegister}${interestTable}`;

export default dropQuery;
