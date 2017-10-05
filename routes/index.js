var express = require('express');
var mysqlcon = require('mysql');
var router = express.Router();
//var url = require('url');



//MySQL
var sqlInfo = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
}
/* GET home page. */
router.get('/', function (req, res, next) {
  // connect to MySQL server
  var client = mysqlcon.createConnection(sqlInfo);
  client.connect();
  // Perform query and wait for results
  client.query("SELECT * FROM todo", function (err, row, fields) {
    // Done with the connection
    /*{
      res.writeHead(200, { 'Content-Type': 'application/json'});
      res.end(JSON.stringify(rows));
      res.end();
    };*/
    client.end();
    // Handle error
    if (err) throw err;
    else {
      // We got a result: render it
      console.log(row);
      res.render("index", { title: 'To do list', userresults: row });
    }
  });
});

  

  router.post('/insert', function (req, res) {

    var client = mysqlcon.createConnection(sqlInfo);
    client.connect();
    var todo = req.body.todo;
    res.json(
      todo
    );
  
    client.query("INSERT INTO todo(todo_msg) VALUES('" + req.body.search_txt + "')", function (err, row, fields) {
      client.end();
      // Handle error
      if (err) throw err;
      else {
        // We got a result: render it
        console.log(row);
        res.render("index", { userresults : rows });
      }
    });
  });
    // var todo = req.body.todo;
    // res.json(
    //   todo
    // );
    //   pool.getConnection(function (error, conn) {

    //     var queryString = "insert into todo(todo_msg) values('" + req.body.search_txt + "')";

    //     conn.query(queryString, function (error, results) {
    //       if (error) {
    //         throw error;
    //       }
    //       else {
    //         console.log('Inserted Successfully!')
    //       }

    //     });
    //     conn.release();
    //  });


  //});

  //app.get("/ajax.txt",function (req,res){
  //res.sendFile("/ajax.txt");
  //})
  module.exports = router;
