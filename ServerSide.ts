
import * as dbConnector from './EraDBConnect'
import * as express from 'express'
// import * as crypto from 'crypto'

// let dbConnector = require('./EraDBCon')
// const express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var favicon = require('serve-favicon')
 
const app = express()
app.use(express.static(__dirname))
// app.use('/login',express.static(__dirname))
// app.use(express.static('public'))
app.use('/',express.static('views'))
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
    console.log('HEERE')
    if (req.session.username) {
        console.log('sending')
        console.log(req.session.username)
     res.render('HomePage',{
         logged_in_user:req.session.username
     })   
    }
else   {
    console.log('sending html')
    res.sendFile(__dirname+"/html/HomePage.html")
} 
})
app.get('/aboutEra',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('aboutUs',{
         logged_in_user:req.session.username
     })   
    }
else  res.sendFile(__dirname+"/html/aboutUs.html")
})
app.get('/eraLive',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('liveSessions',{
         logged_in_user:req.session.username
     })   
    }
else    res.redirect('/eraLogin',307)
    // res.sendFile(__dirname+"/html/liveSessions.html")
})
app.get('/courses/maths',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('maths',{
         logged_in_user:req.session.username
     })   
    }
else    res.redirect('/eraLogin',307)
    // res.sendFile(__dirname+"/html/maths.html")
})
app.get('/courses/science',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('science',{
         logged_in_user:req.session.username
     })   
    }
else    res.redirect('/eraLogin',307)
})
app.get('/courses/alr',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('alr',{
         logged_in_user:req.session.username
     })   
    }
else    res.redirect('/eraLogin',307)
})
app.get('/courses/ss',function(req,res) {
    if (req.session.loggedin) {
        console.log(req.session.username)
     res.render('softskills',{
         logged_in_user:req.session.username
     })   
    }
else    res.redirect('/eraLogin',307)
})
app.get('/eralogin',function(req,res) {
    res.sendFile(__dirname+"/html/SignIn.html")
})
app.get('/erasignup',function(req,res) {
    res.sendFile(__dirname+"/html/signUp.html")
})
app.get('/erasignout',function(req,res) {
    // The Sign Out Logic
    req.session.loggedin = false
    req.session.username = 'NONE'
    res.redirect('/')
})
app.get('/studymaterial',(req,res)=>{
res.render('studyMaterial',{},(err,html)=>{if (err) console.error(err);
else res.send(html)});
});
app.post('/registerUser',async function(req,res) {
    var x = [req.body.name,req.body.password,req.body.phone,req.body.email]
    console.log(x)
    let encPass = dbConnector.encryptPassword(req.body.password)
    var isUserRegistered = await dbConnector.signUpUser(req.body.name,encPass,req.body.phone,req.body.email)
    if (isUserRegistered) {
        res.redirect('/eralogin')
    }
    else res.sendStatus(406)

})

app.post('/login',async function(req,res) {
    let encPass = dbConnector.encryptPassword(req.body.password)
  var canUserLogin = await dbConnector.signIn(req.body.email,encPass)
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
