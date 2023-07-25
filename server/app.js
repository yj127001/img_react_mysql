
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

  //img filter
//   const isImage = (req,file,cb)=>{
//     if(file.mimetype.startWith("image")){
//         cb(null,true)
//     }else{
//         cb(null,Error('only image is allowed'))
//     }
//   }

// const upload = multer({ storage: imgconfig ,fileFilter:isImage});
const upload = multer({ storage: imgconfig });


app.post("/upload", upload.single('newFile'),(req, res) => {
    // use modules such as express-fileupload, Multer, Busboy
    const imgname = req.file.originalname
    if(!req.file){
        res.status(422).json({result:422,msg:"please upload image"})
    }
    try{
        conn.query("INSERT INTO usersdata SET ?",{userimg:imgname},(err,res)=>{
            if(err){
                console.log("ddddd"+imgname)
            }else{
                console.log("data added")
            }
        })
    }catch(error){
        res.status(422).json({result:422,error})
    }
    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

app.get("/getdata",(req,res)=>{
    try{
        conn.query("SELECT * FROM usersdata",(err,res)=>{
            if(err){
                console.log("error")
            }else{
                console.log(res)
            }
        })
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