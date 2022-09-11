import db from "./database.js";

export const insertDemande = (data, result) => {
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