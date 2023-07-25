const mysql = require("mysql");

const conn = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"201@1!@Jj",
    database:"userimgupload"
});

conn.connect((error)=>{
    if(error) throw error;
    console.log("connected1!")
})

module.exports = conn