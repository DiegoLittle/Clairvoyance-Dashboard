import express from 'express'
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')


import { MongoDB } from './modules/mongoDB'
const mongo = new MongoDB("", "patterns")
var cors = require('cors')
import { Filesystem } from './modules/FileSystem'
const app = express()
app.use(cors())
app.use(express.json())
const directory = new Filesystem()
directory.cwd = process.cwd()+"/files"

app.get("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "diego",
    email: "diegochelittle@gmail.com"
  }

  jwt.sign({ user: user }, 'secretkey', (error: any, token: any) => {
    res.send({ token: token })
  })
})

app.post("/api/test",verifyToken,(req:any,res)=>{
  jwt.verify(req.token, 'secretkey',(error:any,authData:any)=>{
    if(error){
      res.sendStatus(403)
    }
    else{
      res.json({
        message:'Post created...',
        authData
      })
    }
  })
})

app.get("/api/files/list", (req, res) => {

  let contents: {}[] = dirList()


  res.send({ "cwd": directory.cwd, "documents": contents })
})

app.get("/api", (req, res) => {
  res.send({ "cwd": "Hello World"})
})


app.post("/api/files/open", async (req, res) => {
  // Input Filename and Type
  // If it's a file then read and return else set the cwd to the directory in both state and server
  if (directory.isDirectory(req.body.filename)) {
    console.log(req.body.filename)
    directory.cd(req.body.filename)
    // console.log(directory.cwd)
    let contents: {}[] = dirList()
    res.send({ "cwd": directory.cwd, "documents": contents })
  }
  else {
    console.log("File")
    let result = await directory.readDocument(req.body.filename)
    res.send({ "filename": req.body.filename, "contents": result, "type": req.body.type })
  }



  // console.log(result)

})

app.post("/api/files/save", async (req, res) => {
  let result = await directory.writeToFile(req.body.filename, req.body.contents)
  console.log(result)
  res.send({ "filename": req.body.filename, "contents": result })
})

app.post("/api/files/delete", async (req, res) => {
  // console.log(req)
  // let result = await directory.writeToFile(req.body.filename, req.body.contents)
  let result = await directory.deleteDocument(req.body.filename)
  console.log(result)
  res.send({ "filename": req.body.filename, "contents": result })
})

app.get("/api/patterns", async (req, res) => {
  await mongo.run()
  let documents = await mongo.find("software")
  console.log(documents)
  res.send({ "patterns": documents })
  await mongo.close()
})

app.post("/api/patterns", async (req, res) => {
  console.log(req.body)
  let documents = mongo.insert("software", req.body)
})

app.listen(5555, () => {
  console.log("Express server running on port 5555")
})
function dirList() {
  let dir = directory.ls()
  let contents: {}[] = []
  dir.forEach(filename => {
    let item = {
      filename: filename,
      type: "File",
    }
    if (directory.isDirectory(filename)) {
      item.type = "Directory"
    }
    contents.push(item)
  })
  return contents
}

//FORMAT OF TOKEN
// Authorization: Bearer <access_token></access_token>

function verifyToken(req:any,res:any,next:any){
  //Get Auth Header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== "undefined"){
    // Split at the space
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next()

  }
  else{
    // forbidden request
    res.sendStatus(403);
  }

}