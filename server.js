const mysql = require('mysql');
const mysqlConnection= require('./database-connections')
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());



mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(8080, () => console.log('Express server is runnig at port no : 3000'));


//Get all employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', async(req, res) => {
    let emp = req.body;
    console.log(emp)
    
    mysqlConnection.query('INSERT INTO employee (EmpID, Name,EmpCode ,salary) VALUES (?, ?, ?, ?)', [emp.EmpID, emp.Name,emp.EmpCode,emp.salary], async (err, rows, fields) => {
        if (!err)
            
            mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
                if (!err)
                    res.send(rows);
                else
                    console.log(err);
            })
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    console.log(req.body.Salary)
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query('UPDATE employee SET  Name = ?, EmpCode=? ,Salary=? WHERE EmpID = ?', [emp.Name, emp.EmpCode, emp.salary,emp.EmpID], (err, rows, fields) => {
        mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?', [emp.EmpID], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        })
    })
});