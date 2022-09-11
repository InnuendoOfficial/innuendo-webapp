import mysql from "mysql2";

var db = mysql.createPool({
    connectionLimit:4,
    host: '65.52.128.29',
    user: 'sephora',
    password: 'Abracadabra124',
    database: 'InnuendoPro'
});

db.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
});

export default db;
