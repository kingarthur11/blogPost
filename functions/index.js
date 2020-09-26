const functions = require('firebase-functions');
const {app} = require('firebase-admin');
const express = require('express');

const bodyparser = require('body-parser');
const path = require('path');


const appExp = express();

const route = require('./route');

appExp.use(bodyparser.urlencoded({ extended: true }));
appExp.use(express.static(path.join(__dirname, 'public')));

appExp.use(route.routes);

exports.app = functions.https.onRequest(appExp);