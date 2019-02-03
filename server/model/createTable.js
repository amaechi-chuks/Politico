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
  isAdmin boolean DEFAULT FALSE,
  registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO users (firstname, lastname, othername, email, password, phonenumber, passporturl, isAdmin) VALUES ('chuks', 'amaechi', 'patrick', 'amaechichuks2000@yahoo.com', '$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08098989898', 'chuksimage.jpeg', TRUE
);

DROP TABLE IF EXISTS party CASCADE;
CREATE TABLE party (
id SERIAL primary key,
name varchar (40) NOT NULL,
hqAddress varchar (70) NOT NULL,
logoUrl varchar (50) NOT NULL,
registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO party (name, hqAddress, logoUrl) VALUES ('People Party', 'plot 5 bello street', 'people.jpeg');

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
