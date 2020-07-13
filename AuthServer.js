
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");

var app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname))
app.use(session({
    secret: 'vneoflvnbeoivnwoiednhvweoivnbcobv eoqib',
    resave:true,
    saveUninitialized:false
}))
