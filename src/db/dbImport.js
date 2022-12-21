// import db from "./database.js";

const db = require('./database.js')

const insertDemande = (data, result) => {
    console.log("requete = ", data.data.sql)
    db.query(data.data.sql, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}