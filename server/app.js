
const express = require('express');
const app = express();
require('./db/conn')
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
  const isImage = (req,file,cb)=>{
    if(file.mimetype.startWith("image")){
        cb(null,true)
    }else{
        cb(null,Error('only image is allowed'))
    }
  }

const upload = multer({ storage: imgconfig ,fileFilter:isImage});

app.post("/upload", upload.single('newFile'),(req, res) => {
    // use modules such as express-fileupload, Multer, Busboy
    console.log(req.body);
    console.log(req.file);
    setTimeout(() => {
        console.log('file uploaded')
        console.log(req.files)
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

app.delete("/upload", (req, res) => {
    
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(8080, () => {
    console.log(`Server running on port 8080`)
});