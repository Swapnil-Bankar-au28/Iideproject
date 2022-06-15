const express = require('express')

const app = express()

const PORT = process.env.PORT || 3008

const mysql = require('./connection').mysqlConnection




// COnfiguiration 

app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.urlencoded())
    // handle middleware 
app.use(express.json())
    // config style css file 

app.use(express.static(__dirname + "/public"))

// Routing 
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/add', (req, res) => {
    res.render('add')
})
app.get('/search', (req, res) => {
    res.render('search')
})
app.get('/update', (req, res) => {
    res.render('update')
})
app.get('/delete', (req, res) => {
    res.render('delete')
})

app.get("/view", (req, res) => {
    let qry = "select * from studentdata ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});

app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, phone, email, gender } = req.query

    // Sanitization XSS...

    let qry = "select * from studentdata where emaiID=? or phonenumber=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into studentdata values(?,?,?,?)";
                mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
        }
    })
});
// app.get("/searchstudent", (req, res) => {
//     // fetch data from the form


//     const { phone } = req.query;
//     // fetched data 
//     let qry = "select * from studentdata where phonenumber=?";
//     mysql.query(qry, [phone], (err, results) => {
//         if (err) throw err
//         else {
//             if (results.length > 0) {
//                 res.render("search", { mesg1: true, mesg2: false })
//             } else {

//                 res.render("search", { mesg1: false, mesg2: true })

//             }

//         }
//     });
// })

app.get('/searchstudent', (req, res) => {

    const { phone } = req.query;
    // fetched data 
    let qry = "select * from studentdata where phonenumber=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });

})
app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, gender } = req.query;
    let qry = "update studentdata  set username=?, gender=? where phonenumber=?";

    mysql.query(qry, [name, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});
app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from studentdata  where phonenumber=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});

//  connecting the port 
app.listen(PORT, (err) => {

    if (err) {
        console.log("databse is not connectd : ," + err)

    } else {
        console.log(`databse is connedted to the port : ${PORT}`)
    }

})