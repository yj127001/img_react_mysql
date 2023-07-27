
const express = require('express');
const app = express();
const conn = require('./db/conn')
const multer  = require('multer')
const cors = require('cors');
app.use(cors());

const imgconfig = multer.diskStorage({
    destination: (req, file, cb) =>{
      return cb(null, './uploads')
    },
    filename:(req, file, cb) =>{
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
  })
const upload = multer({ storage: imgconfig });

app.use(express.static('public'))

app.post("/upload", upload.single('newFile'),(req, res) => {
    // use modules such as express-fileupload, Multer, Busboy
    // const imgname = req.file.originalname
    // if(!req.file){
    //     res.status(422).json({result:422,msg:"please upload image"})
    // }
    // try{
    //     conn.query("INSERT INTO Images SET ?",{userimg:imgname},(err,res)=>{
    //         if(err){
    //             console.log("ddddd"+imgname)
    //         }else{
    //             console.log("data added")
    //         }
    //     })
    // }catch(error){
    //     res.status(422).json({result:422,error})
    // }
    // setTimeout(() => {
    //     console.log('file uploaded')
    //     return res.status(200).json({ result: true, msg: 'file uploaded' });
    // }, 3000);
});

app.get("/getdata",async ()=>{
    try{
        await conn.query(`SELECT * FROM Images`,(err,res)=>{
            if(err){
                console.log("error")
            }else{
                console.log('this i'+res)
                var columns = "";
                for (var column in res.recordset.columns) {
                    columns += column + ", ";
                }
                console.log("%s\t", columns.substring(0, columns.length - 2));
        
                // ouput row contents from default record set
                res.recordset.forEach(row => {
                    console.log("%s\t%s", row.CategoryName, row.ProductName);
                });
            }
        })
        console.log('nothing')
    }catch(error){
        res.status(422).json({result:422,error})
    }
})

app.delete("/upload", (req, res) => {
    
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});