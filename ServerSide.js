var dbConnector = require('./EraDBConnect')
const express = require('express')
var bodyParser = require('body-parser')
 dbConnector.pool()
const app = express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/*** Routes */
app.get('/',function(req,res) {
    res.sendFile(__dirname+"/html/SignIn.html")
})
app.post('/registerUser',async function(req,res) {
    var x = [req.body.name,req.body.password,req.body.phone,req.body.email]
    console.log(x)
    var isUserRegistered = await dbConnector.registerUser(req.body.name,req.body.password,req.body.phone,req.body.email)
    if (isUserRegistered) {
        res.send("User Saved")
    }
    else res.send("Failed")

})
app.post('/login',async function(req,res) {
  var canUserLogin = await dbConnector.validateUser(req.body.email,req.body.password)
  res.send(canUserLogin)
})
var port = process.env.port || 8080
app.listen(port,function() {
    console.log("Server Started")
})
