const dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
const dropParty = 'DROP TABLE IF EXISTS party CASCADE; ';
const dropOffice = 'DROP TABLE IF EXISTS office CASCADE; ';
const dropVote = 'DROP TABLE IF EXISTS vote CASCADE; ';
const dropRegister = 'DROP TABLE IF EXISTS register CASCADE; ';


const dropQuery = `${dropUsers}${dropParty}${dropOffice}${dropVote}${dropRegister}`;

export default dropQuery;
