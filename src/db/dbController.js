import {insertDemande } from './dbImport.js';

export const showinsertDemande = (req, res) => {
    const data = req.body;
    insertDemande(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}