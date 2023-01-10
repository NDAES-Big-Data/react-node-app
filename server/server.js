
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const sql = require('mssql');

let env = process.env.NODE_ENV||'development';
let config = require('./config')[env]

//let config = require('./config')

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getYear', (req, res) => {
    let year_arr = []
    sql.connect(config.database, err=>{
        if (err) console.log(err)
        new sql.Request().query('SELECT DISTINCT(TBYEAR) FROM dbo.EXP01',(err,result)=>{
            if(err) console.log(err)
            for(let i=0;i<result.recordset.length;i++){
                year_arr.push({
                    'key': i,
                    'value': result.recordset[i]['TBYEAR']
                })                
            }
            res.send(year_arr) 
        })    
    })  
});

app.post('/getLoc', (req, res) => {
    /*The below kind of query cannot be used for sql statements such as
    CREATE, UPDATE and DELETE. Parameters need to be parameterized before 
    passing to sql.
    This is select query which is why parameterized is not required as
    it does not change the state of the database. 
    Or else change the POST request to GET and pass the parameters 
    via URL instead of the body
    */
    let loc_arr = []
    let query = 
        `SELECT DISTINCT(loc1.TBNAME) FROM 
        dbo.EXP01 as exp01 inner join dbo.LOC001 
        as loc1 on exp01.TBKLOC = loc1.TBID where 
        exp01.TBYEAR IN (${req.body.join(',')})`
    sql.connect(config.database,err=>{
        if(err) console.log(err)
        const request = new sql.Request()
        request.query(query,(err,result)=>{
            if (err) console.log(err)
            for (let i=0;i<result.recordset.length;i++){
                loc_arr.push({
                    'key':i,
                    'value': result.recordset[i]['TBNAME']
                })
            }
            res.send(loc_arr)
        })
    })
});






/*
app.get('/getExpt', (req, res) => {
    let exp_arr = []
    sql.connect(config.database, err=>{
        if (err) console.log(err)
        new sql.Request().query('select * from dbo.EXP01',(err,result)=>{
            if(err) console.log(err)
            for(let i=0;i<result.recordset.length;i++){
                exp_arr.push({
                    'key': i,
                    'value': result.recordset[i]
                })                
            }
            res.send(exp_arr) 
        })    
    })  
});*/

app.listen(config.server.port, () => console.log(`Hello world app listening on port ${config.server.port}, and host ${config.server.host}`));
