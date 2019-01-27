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
  passportUrl varchar (100) UNIQUE NOT NULL,
  isAdmin varchar (5) DEFAULT 'false',
  registered TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO users (firstName, lastName, otherName, email, password, phoneNumber, passportUrl. isAdmin) VALUES ('Amaechi', 'Chuks', 'Peter', 'amaechichuks2000@yahoo.com', '$2b$10$Ax80YVp8EK5PUt/hyWx1IejBFTB7d.3wfLJw9vqa6Ermp4Db2/TF6', 07068566559, chuksImage.jpeg, True);

DROP TABLE IF EXISTS party;
CREATE TABLE party (
  id SERIAL primary key,
  name varchar(50) NOT NULL,
  hqAddress varchar (50) NOT NULL,
  logo varchar(100) NOT NULL,
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW()
  );

  DROP TABLE IF EXISTS office;
  CREATE TABLE office (
  id SERIAL primary key,
  type varchar(50) NOT NULL,
  name varchar (50) NOT NULL,
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW()
  );

  DROP TABLE IF EXISTS vote;
  CREATE TABLE votes (
    id SERIAL primary key,
    officeVote int references office(id),
    candidates int references users(id),
    votedat TIMESTAMP NOT NULL DEFAULT NOW()
    );

    DROP TABLE IF EXISTS register;
    CREATE TABLE register (
      id SERIAL primary key,
      office int references office(id),
      user int references users(id),
      registeredat TIMESTAMP NOT NULL DEFAULT NOW()
      );
  `;
export default createTables;
