//https://learn.microsoft.com/en-us/azure/azure-sql/database/connect-query-nodejs?view=azuresql-mi&tabs=macos

const sql = require('mssql');

const config = {
    user: 'jing', // better stored in an app setting such as process.env.DB_USER
    password: '201@1!@Jj', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'jingdatabase.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'jingdatabase', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");

        var resultSet = await poolConnection.request().query(`SELECT * FROM Images`, function(err, recordset) {
            if (err) console.log(err);
            console.log(recordset);
          });

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        // ouput row contents from default record set
        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}

//***************************/
module.exports = sql