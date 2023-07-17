



mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
        console.log(err);
})