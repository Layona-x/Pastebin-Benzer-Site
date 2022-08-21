const http = require("http");
const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const dotenv = require('dotenv')
const conn = require('./mongoose.js')
dotenv.config()

const port = 8080;
conn()
app.use(bodyParser.json()).use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(port,()=>{
  console.log("3000 Portunda Dinleniyor")
})
const Text = require('./models/text.js')

//Statik
app.use(express.static("public"));
app.set("src", "path/to/views");
  
app.get('/',async function(req,res){ 
     res.render(`${__dirname}/src/pages/home.ejs`)                    
})

app.post('/new/paste/',async function(req,res){
  let url = req.params.url
  let token = Math.floor(Math.random() * 9999)
    const text = new Text({
      text:req.body.text,
      title:req.body.title,
      token:token,
    })
 text.save()
  .then((result)=>{
       res.send(`
    Metin Linki : <a href="https://${req.headers.host}/view/${token}"><span>https://${req.headers.host}/view/${token}</span></a>
    <br>
    <button onclick="copyUrl()">Kopyala</button>
    <script>
    function copyUrl(){
      let domain = "${req.headers.host}";
      let token = "${token}";
      navigator.clipboard.writeText(domain+"/view/"+url);
     }
    </script>
    `)
 })
  })

app.get('/view/:token',async function(req,res){
  let token = req.params.token
  Text.findOne({ token:token }).then((result)=>{
    res.render(`${__dirname}/src/pages/text.ejs`,{text:result.text,title:result.title})
})
})
