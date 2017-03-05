var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM tasks;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/new', function(req, res){
  var newTask = req.body;
  console.log(newTask);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO tasks (task_name, task_completed) VALUES ($1, $2);',
        [newTask.taskName, newTask.completed],
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
});

router.delete('/delete/:id', function(req, res){
  var taskId = req.params.id;
  console.log('book of id to delete: ', taskId);
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM tasks WHERE id=$1;', // $1 tells the server to look to the array for [bookId] ajax talks to SQL to do a query
        [taskId], // this is the array of things that replaces the $1, $2, $3 in the query
        function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Error making the database query: ', errorMakingQuery);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
    }
  });
});

module.exports = router;
