import { Response } from "express"
import {Request} from "express"
import * as dbConnector from './EraDBConnect'


// let dbConnector = require('./EraDBCon')
const express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
 
const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.set('view engine','ejs')
app.use(session({
    secret:"EraHaiToMumkinHai",
    resave:true,
    saveUninitialized:false
}))

app.use(bodyParser.json())
app.use(favicon(__dirname+"/public/img/ERA 4- TRANSPARENT BG - Copy.png"))

/***GET Routes */
app.get('/',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('HomePage',{
         logged_in_user:req.session.username
     })   
    }
    res.sendFile(__dirname+"/html/HomePage.html")
})
app.get('/aboutEra',function(req,res) {
    res.sendFile(__dirname+"/html/aboutUs.html")
})
app.get('/eraLive',function(req,res) {
    res.sendFile(__dirname+"/html/liveSessions.html")
})
app.get('/courses/maths',function(req,res) {
    res.sendFile(__dirname+"/html/maths.html")
})
app.get('/courses/science',function(req,res) {
    res.sendFile(__dirname+"/html/science.html")
})
app.get('/courses/alr',function(req,res) {
    res.sendFile(__dirname+"/html/EdTechApptitude.html")
})
app.get('/courses/ss',function(req,res) {
    res.sendFile(__dirname+"/html/softskills.html")
})
app.get('/eralogin',function(req,res) {
    res.sendFile(__dirname+"/html/SignIn.html")
})
app.get('/erasignup',function(req,res) {
    res.sendFile(__dirname+"/html/signUp.html")
})
app.get('/erasignout',function(req:Request,res:Response) {
    // The Sign Out Logic
    req.session.loggedin = false
    req.session.username = 'NONE'
    res.redirect('/')
})
app.post('/registerUser',async function(req:Request,res:Response) {
    var x = [req.body.name,req.body.password,req.body.phone,req.body.email]
    console.log(x)
    var isUserRegistered = await dbConnector.signUpUser(req.body.name,req.body.password,req.body.phone,req.body.email)
    if (isUserRegistered) {
        res.redirect('/eralogin')
    }
    else res.sendStatus(406)

})

app.post('/login',async function(req:Request,res:Response) {
  var canUserLogin = await dbConnector.signIn(req.body.email,req.body.password)
  var logged_in_user = 'NONE'
  if (canUserLogin) {
      req.session.loggedin = true

      req.session.username = await dbConnector.getUserName(req.body.email)
      logged_in_user = req.session.username
  }
  console.log(req.session.username)
  res.render('HomePage',{
      logged_in_user:logged_in_user
  })
  
})
console.log('Here')
var port = process.env.port || 8080
app.listen(port,function() {
    console.log(`Server Started at Port ${port}`)
})
