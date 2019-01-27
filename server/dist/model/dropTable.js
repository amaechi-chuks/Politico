'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dropUsers = 'DROP TABLE IF EXISTS users CASCADE; ';
var dropParty = 'DROP TABLE IF EXISTS party CASCADE; ';
var dropOffice = 'DROP TABLE IF EXISTS office CASCADE; ';
var dropVote = 'DROP TABLE IF EXISTS vote CASCADE; ';
var dropRegister = 'DROP TABLE IF EXISTS register CASCADE; ';

var dropQuery = '' + dropUsers + dropParty + dropOffice + dropVote + dropRegister;

exports.default = dropQuery;