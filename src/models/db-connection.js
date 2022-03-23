
//Este el el archivo db-connection
// const dotenv = require('dotenv');
// dotenv.config();
const mysql2 = require('mysql2');
const config = require('./../configs/databases');

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            host: config.hoteldb.host,
            user: config.hoteldb.user,
            password: config.hoteldb.password,
            database: config.hoteldb.database,
            multipleStatements: config.hoteldb.multipleStatements
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {

            const callback = (error, result) => {
                // console.log("a, b, c");
                // console.log(a, b, c);
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }            
            
            this.db.query(sql, values, callback);
            
            if(values){
                let _sql = sql;
                for (let index = 0; index < values.length; index++) {
                    _sql = _sql.replace(`?`, `'${values[index]}'`);    
                }
                console.log(_sql)
            }

        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;