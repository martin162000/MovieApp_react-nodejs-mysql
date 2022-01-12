const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 6;
const stringCryptpass = "#@&*./1";

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(
    session({
        key: "userId",
        secret: "movieApp",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 24 * 3 * 60 * 60 * 1000,   // 24 hod * 3 = 3dni
        },
    }))
    

//********************** POST ***************************// 
//********************** POST ***************************// 
//********************** POST ***************************// 

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const strongPass = password + stringCryptpass;

    if(!username) {
        return res.send({usernameMsg: "*Required"});
    } else if(username.length < 4) {
        return res.send({usernameMsg: "Username must contains at least 4 characters"});
    } else  if(username.length > 12) {
        return res.send({usernameMsg: "Username could at maximum 12 characters"});
    } else if(!password) {
        return res.send({passwordMsg: "*Required"});
    } else if(password.length < 6) {
        return res.send({passwordMsg: "Password must contains at least 6 characters"});
    } else if(password.length > 18) {
        return res.send({passwordMsg: "Password could at maximum 18 characters"});
    } else if(!email) {
        return res.send({emailMsg: "*Required"});
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send({emailMsg: "Email is bad"});
    }

    bcrypt.hash(strongPass, saltRounds, (err, hash) => {

        if(err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (username, password, email) VALUES (?,?,?);",
             [username, hash, email],
              (err, result) => {
                if(err){   
                    if(err.code == 'ER_DUP_ENTRY')
                      return res.send({messageFalse: "Username already exists"});
                    }
        
                 res.send({messageTrue: "User was created"});
                }
             ); 
    })

})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const strongPass = password + stringCryptpass;


    if(!username) {
        return res.send({usernameMsg: "*Required"});
    } else if(username.length < 4) {
        return res.send({usernameMsg: "Username must contains at least 4 characters"});
    } else  if(username.length > 12) {
        return res.send({usernameMsg: "Username could at maximum 12 characters"});
    } else if(!password) {
        return res.send({passwordMsg: "*Required"});
    } else if(password.length < 6) {
        return res.send({passwordMsg: "Password must contains at least 6 characters"});
    } else if(password.length > 18) {
        return res.send({passwordMsg: "Password could at maximum 18 characters"});
    }  

    db.query(
    "SELECT * FROM users WHERE username = ?;",
     [username],
      (err, result) => {
        if(err) {
            res.send({err: err});
        } 
        if(result.length > 0) {
            bcrypt.compare(strongPass, result[0].password, (error, response)=> {
                if(response) {
                    req.session.user = result;
                    res.send(result)
                } else {
                    res.send({messageFalse: "Wrong username / password"});
                }
            })
        } else {
            res.send({messageFalse: "User doesn't exist"});
        }
        

        }
     ); 
})


app.post('/updatePassword', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const strongPass = password + stringCryptpass;

    if(!password) {
        return res.send({passwordMsg: "*Required"});
    } else if(password.length < 6) {
        return res.send({passwordMsg: "Password must contains at least 6 characters"});
    } else if(password.length > 18) {
        return res.send({passwordMsg: "Password could at maximum 18 characters"});
    } 
    
    

    bcrypt.hash(strongPass, saltRounds, (err, hash) => {

        if(err) {
            console.log(err);
        }
        db.query(
            "UPDATE users SET password = ? WHERE username = ?",
             [hash, username],
              (err) => {
                if(err) {
                    throw err;
                }
                 res.send({messageTrue: "User password was updated"}); 


                let sqlCommand = "INSERT INTO users_history (username, action, date)";
                sqlCommand += " VALUES (?,?,?);";
                let created = new Date();
                db.query(
                    sqlCommand,
                        [username, "changePassword", created],
                        (err) => {
                            if(err) {
                                throw err;
                            }
                            }
                        ); 

                }
             ); 

    })

})


app.post('/updateEmail', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    if(!email) {
        return res.send({emailMsg: "*Required"});
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send({emailMsg: "Email is bad"});
    }

    db.query(
    "UPDATE users SET email = ? WHERE username = ?",
     [email, username],
      (err) => {
        if(err) {
            throw err;
        }

        let sqlCommand = "INSERT INTO users_history (username, action, date)";
        sqlCommand += " VALUES (?,?,?);";
        let created = new Date();
        db.query(
            sqlCommand,
                [username, "changeEmail", created],
                (err) => {
                    if(err) {
                        throw err;
                    }
                    }
                ); 

         res.send({messageTrue: "User email was updated"}); 
        }
     ); 

})


app.post('/addFavourite', (req, res) => {
    const iduser = req.body.iduser;
    const title = req.body.title;
    const year = req.body.year;
    const linkApi = req.body.linkApi;
    const type = req.body.type;
    const poster = req.body.poster;



    let sqlCommand = "INSERT INTO movies (id_user, title, year, linkApi, type, poster) ";
    sqlCommand += " SELECT '?',?,?,?,?,?";
    sqlCommand += " WHERE NOT EXISTS(SELECT id_user, linkApi  FROM movies WHERE id_user = '?' AND linkApi = ?);";



    db.query(
        sqlCommand,
         [iduser,title,year,linkApi,type,poster,iduser,linkApi],
          (err, result) => {
            if(err) {
                throw err;
            }

            if(result.affectedRows > 0)
                res.send({messageTrue: "User added movie"}); 
            
            }
         ); 

})




app.post('/addMovieHistory', (req, res) => {
    const iduser = req.body.iduser;
    const title = req.body.title;
    const linkApi = req.body.linkApi;
    const type = req.body.type;
    const action = req.body.action;



    let sqlCommand = "INSERT INTO movies_history (id_user, title, linkApi, type, action) ";
    sqlCommand += " VALUES (?,?,?,?,?);";



    db.query(
        sqlCommand,
         [iduser,title,linkApi,type,action],
          (err, result) => {
            if(err) {
                throw err;
            }

            if(result.affectedRows > 0)
                res.send({messageTrue: "Movie added to history"}); 
            
            }
         ); 

})





app.post('/deleteFavourite', (req, res) => {
    const userid = req.session.user[0].id
    const linkApi = req.body.linkApi;

    let sqlCommand = "DELETE FROM movies WHERE id_user = '?' AND linkApi = ?;";


    db.query(
        sqlCommand,
         [userid, linkApi],
          (err, result) => {
            if(err) {
                throw err;
            }

            console.log(result)

            if(result.affectedRows > 0)
                res.send({messageTrue: "User deleted movie"}); 
            
            }
         ); 

})

//********************** GET ***************************// 
//********************** GET ***************************// 
//********************** GET ***************************// 


app.get("/getUserHistory", (req, res) => {

    if(req.session.user) {
        const username = req.session.user[0].username
        db.query(
            "SELECT action, date from users_history WHERE username = ?;",
             [username],
              (err, result) => {
                if(err) {
                    throw err;
                } 
                    res.send({usersHistory: result});
                }
             ); 


    } else {
        res.send({loggedIn: false});
    }
})


app.get("/getMoviesHistory", (req, res) => {

    if(req.session.user) {
        const userid = req.session.user[0].id
        db.query(
            "SELECT title, linkApi, type, action from movies_history WHERE id_user = ?;",
             [userid],
              (err, result) => {
                if(err) {
                    throw err;
                } 
                    res.send({moviesHistory: result});
                }
             ); 


    } else {
        res.send({loggedIn: false});
    }
})


app.get("/details", (req, res) => {

    if(req.session.user) {
        const userid = req.session.user[0].id
        db.query(
            "SELECT title, year, linkApi, type, poster from movies WHERE id_user = ?",
             [userid],
              (err, result) => {
                if(err) {
                    throw err;
                } 
                    res.send({details: result});
                }
             ); 


    } else {
        res.send({loggedIn: false});
    }
})


app.get("/login", (req, res) => {
    if(req.session.user) {

        db.query(
            "SELECT id, username, email from users WHERE username = ?",
             [req.session.user[0].username],
              (err, result) => {
                if(err) {
                    throw err;
                } 
                    res.send({loggedIn: true, user: result});
                }
             ); 


    } else {
        res.send({loggedIn: false});
    }
})


app.get("/logout", (req, res) => {
    if(req.session.user) {
        res.send({seassionIn: true});
        req.session.destroy();
    } else {
        res.send({seassionIn: false});
    }
})




app.listen(3001, () => {
    console.log("running");
});