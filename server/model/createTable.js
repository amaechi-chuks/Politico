const createTables = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  firstName varchar (30) NOT NULL,
  lastName varchar (30) NOT NULL,
  otherName varchar (30),
  email varchar (30) UNIQUE NOT NULL,
  password varchar (65) NOT NULL,
  phoneNumber varchar (14) UNIQUE NOT NULL,
  isadmin boolean DEFAULT FALSE,
  registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO users (firstName, lastName, otherName, email, password, phoneNumber, isadmin) VALUES ('chuks', 'amaechi', 'patrick', 'amaechichuks2000@yahoo.com', '$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08098989898', TRUE
);

DROP TABLE IF EXISTS party CASCADE;
CREATE TABLE party (
id SERIAL primary key,
name varchar (40) NOT NULL,
hqAddress varchar (70) NOT NULL,
logoUrl varchar (50) NOT NULL,
registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);

DROP TABLE IF EXISTS office CASCADE;
CREATE TABLE office (
id SERIAL primary key,
type varchar (20) NOT NULL,
name varchar (40) NOT NULL,
createdAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO office (type, name) VALUES ('federal', 'senate');

DROP TABLE IF EXISTS candidate CASCADE;
CREATE TABLE candidate (
id SERIAL ,
office int references office(id),
candidate int references users(id),
registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
PRIMARY KEY (candidate, office)
);


DROP TABLE IF EXISTS vote CASCADE;
CREATE TABLE vote (
id SERIAL ,
createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
candidate int references users(id),
office int references office(id),
voter int references users(id),
primary key (office, voter)
);

`;
export default createTables;
