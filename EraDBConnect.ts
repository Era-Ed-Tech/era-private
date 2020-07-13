

import * as crypto from 'crypto'
import mysql = require('mysql')
let password = 'EraKeyByJSGrewal'
let thePool:mysql.Pool
function createConnection() {
    
    thePool =  mysql.createPool({
        host: "eradbinstance.cjxm1lyeh9rj.ap-south-1.rds.amazonaws.com",
        user: "eraroot",
        password: "eratoor1",
        database: "erardbms"
})
return thePool
}


export async function signUpUser(name, password, phone, email) {
    var pool = createConnection()
    var userId = generateRandomUserId()
    var theQuery = `insert into era_user(user_id,user_name,user_phone,user_email,user_password) values ?`
    var VALUES = [
        [userId, name, phone, email, password]
    ]
    return new Promise(function (resolve, reject) {
        var formattedQuery = mysql.format(theQuery, [VALUES])
        pool.query(formattedQuery, function (err) {
            if (err) reject(err)
            else resolve(true)
        },function() {

        })
    }).catch(function (err) {
        console.error(err)
        return false
    })
}

export async function signIn(email, password) {
    var pool = createConnection()
    var theQuery = `select count(*) as theCount from era_user where user_email = "${email}" && user_password = "${password}"`
    return new Promise(function (resolve, reject) {
        pool.query(theQuery, function (err, result) {
            if (err) reject(err)
            else if (result[0].theCount != 1) resolve(false)
            else resolve(true)
        })
    }).catch(function (err) {
        console.error(err)
        return false
    })
}

export async function getUserName(email) {
    return new Promise(function(resolve,reject) {
        let theQuery = `select user_name from era_user where user_email = "${email}" `
        let pool = createConnection()
        pool.query(theQuery,function(err,res) {
            if (err) reject(err)
            resolve(res[0].user_name)
        })
        
    }).catch((err)=>{
        console.error(err)
        return false
    })
}

function generateRandomUserId() :number {
    var min = 0
    var max = 999999
    var random =
        Math.floor(Math.random() * (+max - +min)) + +min
    return random
}

/***
     * The Encryption Function AES 128
     * @author JSGREWAL
     */
     export function encryptPassword(data) {
        const cipher = crypto.createCipher('aes128', password);
        var encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    /***
     * The Decryption Function AES 128
     * @author JSGREWAL
     */
    export function decryptPassword(data) {
        const decipher = crypto.createDecipher('aes128', password);
        var decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }