//import express from "express";
//import {showinsertDemande} from './dbController.js';
const showinsertDemande = require('./dbController.js')
const express = require('express')
const router = express.Router();

router.post('/demande', showinsertDemande);

//export default router;