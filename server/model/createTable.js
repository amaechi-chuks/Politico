const createTables = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL primary key,
  firstName varchar (30) NOT NULL,
  lastName varchar (30) NOT NULL,
  otherName varchar (30),
  passporturl VARCHAR(200),
  email varchar (30) UNIQUE NOT NULL,
  password varchar (65) NOT NULL,
  phoneNumber varchar (14) UNIQUE NOT NULL,
  isadmin boolean DEFAULT FALSE,
  registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO users 
(firstName, lastName, otherName, passporturl, email, password, phoneNumber, isadmin) 
VALUES 
('chuks', 'amaechi', 'patrick', 'null', 'amaechichuks2000@yahoo.com', '$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08098989898', TRUE), 
('Onyinyechi', 'Ibeh', 'Nelly', 'null', 'onyibeh2015@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '07031599965', FALSE),
('Chinedu', 'Ibeh', 'Kingsley', 'null', 'kingsbig2001@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '07030996964', TRUE),
('Ebube', 'Ibeh', 'Micheal', 'null', 'chimdibig@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08189051069', FALSE),
('Chima', 'Iheoma', 'patrick', 'null', 'chimaiheaoma@yahoo.com', '$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08098989877', FALSE), 
('Ugonna', 'Orgazi', 'Simeon', 'null', 'orgaziug@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '07031599909', FALSE),
('Nonye', 'Orgazi', 'Chinonye', 'null', 'orgazicp@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '07030996966', FALSE),
('Chijioke', 'Iheagwam', 'Patrick', 'null', 'cypo@gmail.com','$2y$12$5vGNy.VWcS8wuR3wDsCpauEb1xotpRfMO53kxEwDqKE0YRI.kb2a.', '08189051061', FALSE);

DROP TABLE IF EXISTS party CASCADE;
CREATE TABLE party (
id SERIAL primary key,
name varchar (40) UNIQUE NOT NULL,
hqAddress varchar (70) NOT NULL,
logoUrl varchar (50) NOT NULL,
registeredAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO party
(name, hqAddress, logoUrl)
VALUES
('People Democratic Party (PDP)', '230 Badia Rd Abuja', 'power.jpg'),
('Action Democratic Party (ADP)', '23 Aromire Rd Lagos', 'acdempa.jpg'),
('African Democratic Congress (ADC)', '134 Ekulobia ORlu Rd Anambra', 'adc.jpg'),
('African Action Congress (AAC)', '230 Badia Rd Abuja', 'african.jpg'),
('All Peoples Party (APP)', '230 Badia Rd Abuja', 'people.jpg'),
('Alliance for Democracy (AD)', '110 Ikoyi Crescent Abuja', 'alliance.jpg'),
('Democratic Alternative (DA)', '90 Ensia Rd Rivers', 'democratic.jpg'),
('Communist Party of Nigeria (CPN)', '230 Umuani Rd Rivers', 'communist.jpg'),
('All Progressive Grand Alliance (APGA)', '234 Upper Iweka Rd Anambra', 'apga.jpg'),
('All Progressive Congress (APC)', '298 Bourdillion  str EKo Lagos', 'apc.png');


DROP TABLE IF EXISTS office CASCADE;
CREATE TABLE office (
id SERIAL primary key,
type varchar (20) NOT NULL,
name varchar (40) UNIQUE NOT NULL,
createdAt TIMESTAMP WITH TIME ZONE DEFAULT now()
);
INSERT INTO office (type, name) 
VALUES 
('Legislative', 'Senate'),
('Legislative', 'Federal House of Representative'),
('Federal', 'President'),
('State', 'Governor'),
('Local Government', 'Local Government Chairman'),
('Local Government', 'Councilors'),
('Legislative', 'State House of Representative');

DROP TABLE IF EXISTS interest CASCADE;
CREATE TABLE interest (
id int references users(id) PRIMARY KEY ,
party int references party(id),
office int references office(id),
status boolean default false,
createdOn TIMESTAMP WITH TIME ZONE DEFAULT now()
);

DROP TABLE IF EXISTS vote CASCADE;
CREATE TABLE vote (
id SERIAL ,
createdOn TIMESTAMP WITH TIME ZONE DEFAULT now(),
candidate int references interest(id),
office int references office(id),
voter int references users(id),
primary key (office, voter)
);

`;
export default createTables;
