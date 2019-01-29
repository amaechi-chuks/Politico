const createTables = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  firstname varchar (30) NOT NULL,
  lastname varchar (30) NOT NULL,
  othername varchar (30),
  email varchar (30) UNIQUE NOT NULL,
  password varchar (65) NOT NULL,
  phonenumber varchar (14) UNIQUE NOT NULL,
  passporturl varchar (100) UNIQUE NOT NULL,
  isAdmin varchar (5) DEFAULT 'false',
  registered TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);
  `;
export default createTables;
