var mysql = require('mysql2/promise');

var connectionPools = new Map();

async function getSqlConnectionPool(database) {
    if(connectionPools.has(database)) return connectionPools.get(database);
    try {
        let pool = await mysql.createPool({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            database: database,
            waitForConnections: true,
            connectionLimit: 10
        });
        connectionPools.set(database, pool);
        return pool;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    runSqlQuery : async function(database, queryString, queryArgs, rethrowError) {
        try {
            let pool = await getSqlConnectionPool(database);
            let rows = await pool.query(queryString, queryArgs);
            return rows[0];
        } catch (error) {
            if(rethrowError) throw(error);
            else console.log(error);
        }
    }
}