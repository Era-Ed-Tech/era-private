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
exports.decryptPassword = exports.encryptPassword = exports.getUserName = exports.signIn = exports.signUpUser = void 0;
var crypto = require("crypto");
var mysql = require("mysql");
var password = 'EraKeyByJSGrewal';
var thePool;
function createConnection() {
    thePool = mysql.createPool({
        host: "eradbinstance.cjxm1lyeh9rj.ap-south-1.rds.amazonaws.com",
        user: "eraroot",
        password: "eratoor1",
        database: "erardbms"
    });
    return thePool;
}
function signUpUser(name, password, phone, email) {
    return __awaiter(this, void 0, void 0, function () {
        var pool, userId, theQuery, VALUES;
        return __generator(this, function (_a) {
            pool = createConnection();
            userId = generateRandomUserId();
            theQuery = "insert into era_user(user_id,user_name,user_phone,user_email,user_password) values ?";
            VALUES = [
                [userId, name, phone, email, password]
            ];
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var formattedQuery = mysql.format(theQuery, [VALUES]);
                    pool.query(formattedQuery, function (err) {
                        if (err)
                            reject(err);
                        else
                            resolve(true);
                    }, function () {
                    });
                })["catch"](function (err) {
                    console.error(err);
                    return false;
                })];
        });
    });
}
exports.signUpUser = signUpUser;
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var pool, theQuery;
        return __generator(this, function (_a) {
            pool = createConnection();
            theQuery = "select count(*) as theCount from era_user where user_email = \"" + email + "\" && user_password = \"" + password + "\"";
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    pool.query(theQuery, function (err, result) {
                        if (err)
                            reject(err);
                        else if (result[0].theCount != 1)
                            resolve(false);
                        else
                            resolve(true);
                    });
                })["catch"](function (err) {
                    console.error(err);
                    return false;
                })];
        });
    });
}
exports.signIn = signIn;
function getUserName(email) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var theQuery = "select user_name from era_user where user_email = \"" + email + "\" ";
                    var pool = createConnection();
                    pool.query(theQuery, function (err, res) {
                        if (err)
                            reject(err);
                        resolve(res[0].user_name);
                    });
                })["catch"](function (err) {
                    console.error(err);
                    return false;
                })];
        });
    });
}
exports.getUserName = getUserName;
function generateRandomUserId() {
    var min = 0;
    var max = 999999;
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
}
/***
     * The Encryption Function AES 128
     * @author JSGREWAL
     */
function encryptPassword(data) {
    var cipher = crypto.createCipher('aes128', password);
    var encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
exports.encryptPassword = encryptPassword;
/***
 * The Decryption Function AES 128
 * @author JSGREWAL
 */
function decryptPassword(data) {
    var decipher = crypto.createDecipher('aes128', password);
    var decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.decryptPassword = decryptPassword;
