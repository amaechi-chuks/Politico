# Politico
Politico is a platform that enables citizens give their mandate to politicians running different government offices while building trust in the process through transparency.

[![Build Status](https://travis-ci.com/amaechi-chuks/Politico.svg?branch=develop)](https://travis-ci.com/amaechi-chuks/Politico)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d87da9486940f2ed6f5/maintainability)](https://codeclimate.com/github/amaechi-chuks/Politico/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6d87da9486940f2ed6f5/test_coverage)](https://codeclimate.com/github/amaechi-chuks/Politico/test_coverage)
[![Coverage Status](https://coveralls.io/repos/github/amaechi-chuks/Politico/badge.svg?branch=develop)](https://coveralls.io/github/amaechi-chuks/Politico?branch=develop)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)


## Table of Contents

 - [Introduction](#introduction)
 - [UI Templates](#ui-templates)
 - [Installing](#installing)
 - [Working Routes](#working-routes)
 - [License](#license)
 - [Acknowledgments](#acknowledgments)
 - [Contribution](#contribution)
 - [Live Demo](#live-demo)

# Introduction

## *Project Overview*

 
Politico is a platform that enables citizens give their mandate to politicians running different government offices while building trust in the process through transparency.




### __Style guide__

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)


## Screenshoot(UI template)
![alt](./screenShoot/landing-page.jpg)

# UI Templates

Preview UI templates :+1: [Github Pages](https://amaechi-chuks.github.io/Politico/)



## Required Features
1. `Users can sign up`.
2. `Users can login`.
3. `Admin (electoral body) can create political parties`.
4. `Admin (electoral body) can delete a political party`.
5. `Admin (electoral body) can create different political offices`.
6. `Users can vote for only one politician per political
office`.
7. `Users can see the results of election`.

# Installing

#### *Prerequisites*

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org),  and follow the download instructions

To install this app

`
git clone https://github.com/amaechi-chuks/Politico
`

And install the required dependencies

`
npm install
`

Run server

`
npm run start:dev
`

Server listens on port `6000`

## Running the tests

To run test cases

`
npm test
`
# Working Routes

 ## *API Endpoints*
|Endpoint                                           | Functionality                     |HTTP method 
|---------------------------------------------------|:-----------------------------------:|-------------:
|/api/v1/auth/signup                            |Create a user account        |POST
|/api/v1/auth/login                                |Login a user        |POST
|/api/v1/parties                                |Create a political party        |POST
|/api/v1/office/*user_id*                       |Register a user as candidate running for a specific office       |POST
|/api/v1/votes                                  |Vote for a candidate       |POST
|/api/v1/offices                                |Create a political office         |POST
|/api/v1/parties                                |Fetch all political parties        |GET 
|/api/v1/offices                                |Fetch all political offices        |GET 
|/api/v1/parties/*party_id*                     |Fetch the details of a single political party|GET
|/api/v1/offices/*office_id*/                   |Fetch the details of a single political office             |Get
|/api/v1/office/*office_id*/result              |Fetch the result of a specific  office following the conclusion of an election    |GET
|/api/v1/parties/*party_id*/name                |Update political party name              |PATCH
|/api/v1/parties/*party_id*                     |Delete a political party by id     |DELETE



 
## License :boom:
This projects is under the MIT LICENSE

## Acknowledgments :pray:

- [Egghead](https://egghead.io/)
- [Andela](http://andela.com)
- [Devdocs](https://devdocs.io/)
- [Wes Bos ](https://www.youtube.com/user/wesbos)
- [Google Search](https://google.com)
- [Stackoverflow](stackoverflow.com)

## Contribution
*If you want to contribute to this project:*
 - `Fork it! :fork_and_knife:`
 - `Create your feature branch: git checkout -b my-new-feature`
 - `Commit your changes: git commit -m 'Add some feature'`
 - `Push to the branch: git push origin my-new-feature`
 - `Create a pull request. `

### Live demo

You can test the api endpoints
:+1: [Here ](https://politico-software.herokuapp.com/)

