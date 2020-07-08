const mysql = require('mysql')

function createConnection() {
    thePool =  mysql.createPool({
        host: "eradbinstance.cjxm1lyeh9rj.ap-south-1.rds.amazonaws.com",
        user: "eraroot",
        password: "eratoor1",
        database: "erardbms"
})
return thePool
}


async function signUpUser(name, password, phone, email) {
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
        })
    }).catch(function (err) {
        console.error(err)
        resolve(false)
    })
}

async function signIn(email, password) {
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
        resolve(false)
    })
}


function generateRandomUserId() {
    var min = 0
    var max = 999999
    var random =
        Math.floor(Math.random() * (+max - +min)) + +min
    return random
}
module.exports = {
    pool:createConnection,
    registerUser:signUpUser,
    validateUser:signIn
}