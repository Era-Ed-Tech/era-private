"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dbConnector = require("./EraDBConnect");
var express = require("express");
// let dbConnector = require('./EraDBCon')
// const express = require('express')
var session = require('express-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var app = express();
app.use(express.static(__dirname));
// app.use('/login',express.static(__dirname))
// app.use(express.static('public'))
app.use('/', express.static('views'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('view engine', 'ejs');
app.use(session({
    secret: "EraHaiToMumkinHai",
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(favicon(__dirname + "/public/img/ERA 4- TRANSPARENT BG - Copy.png"));
/***GET Routes */
app.get('/', function (req, res) {
    console.log('HEERE');
    if (req.session.username) {
        console.log('sending');
        console.log(req.session.username);
        res.render('HomePage', {
            logged_in_user: req.session.username
        });
    }
    else {
        console.log('sending html');
        res.sendFile(__dirname + "/html/HomePage.html");
    }
});
app.get('/aboutEra', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('aboutUs', {
            logged_in_user: req.session.username
        });
    }
    else
        res.sendFile(__dirname + "/html/aboutUs.html");
});
app.get('/eraLive', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('liveSessions', {
            logged_in_user: req.session.username
        });
    }
    else
        res.redirect('/eraLogin', 307);
    // res.sendFile(__dirname+"/html/liveSessions.html")
});
app.get('/courses/maths', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('maths', {
            logged_in_user: req.session.username
        });
    }
    else
        res.redirect('/eraLogin', 307);
    // res.sendFile(__dirname+"/html/maths.html")
});
app.get('/courses/science', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('science', {
            logged_in_user: req.session.username
        });
    }
    else
        res.redirect('/eraLogin', 307);
});
app.get('/courses/alr', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('alr', {
            logged_in_user: req.session.username
        });
    }
    else
        res.redirect('/eraLogin', 307);
});
app.get('/courses/ss', function (req, res) {
    if (req.session.loggedin) {
        console.log(req.session.username);
        res.render('softskills', {
            logged_in_user: req.session.username
        });
    }
    else
        res.redirect('/eraLogin', 307);
});

app.get('/terms',(req,res)=>{
    res.sendFile(__dirname + "/html/terms.html")
})

app.get('/eralogin', function (req, res) {
    res.sendFile(__dirname + "/html/SignIn.html");
});
app.get('/erasignup', function (req, res) {
    res.sendFile(__dirname + "/html/signUp.html");
});
app.get('/erasignout', function (req, res) {
    // The Sign Out Logic
    req.session.loggedin = false;
    req.session.username = 'NONE';
    res.redirect('/');
});
app.get('/studymaterial', function (req, res) {
    res.render('studyMaterial', {}, function (err, html) {
        if (err)
            console.error(err);
        else
            res.send(html);
    });
});
app.post('/registerUser', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var x, encPass, isUserRegistered;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x = [req.body.name, req.body.password, req.body.phone, req.body.email];
                    console.log(x);
                    encPass = dbConnector.encryptPassword(req.body.password);
                    return [4 /*yield*/, dbConnector.signUpUser(req.body.name, encPass, req.body.phone, req.body.email)];
                case 1:
                    isUserRegistered = _a.sent();
                    if (isUserRegistered) {
                        res.redirect('/eralogin');
                    }
                    else
                        res.sendStatus(406);
                    return [2 /*return*/];
            }
        });
    });
});
app.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var encPass, canUserLogin, logged_in_user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    encPass = dbConnector.encryptPassword(req.body.password);
                    return [4 /*yield*/, dbConnector.signIn(req.body.email, encPass)];
                case 1:
                    canUserLogin = _b.sent();
                    logged_in_user = 'NONE';
                    if (!canUserLogin) return [3 /*break*/, 3];
                    req.session.loggedin = true;
                    _a = req.session;
                    return [4 /*yield*/, dbConnector.getUserName(req.body.email)];
                case 2:
                    _a.username = _b.sent();
                    logged_in_user = req.session.username;
                    _b.label = 3;
                case 3:
                    console.log(req.session.username);
                    res.render('HomePage', {
                        logged_in_user: logged_in_user
                    });
                    return [2 /*return*/];
            }
        });
    });
});
console.log('Here');
var port = process.env.port || 7777;
app.listen(port, function () {
    console.log("Server Started at Port " + port);
});
