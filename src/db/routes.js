import express from "express";
import {showinsertDemande} from './dbController.js';

const router = express.Router();

router.post('/demande', showinsertDemande);

export default router;