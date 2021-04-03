var express = require('express');
var router = express.Router();
const db = require('./queries')


// const Pool = require('pg')
// const pool = new Pool({
//   user: 'tlyecqezatjcgb',
//   host: 'ec2-52-44-31-100.compute-1.amazonaws.com',
//   database: 'd77d7pkvqo39mr',
//   password: '96ec013dbe30e7b521fb4cfb507eeb02289ebf578254c3592e0581e94e282d21',
//   port: 5432,
// })

// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: '1234',
//   port: 5432,
// })

const { Client } = require('pg');

const client = new Client({
  connectionString:'postgres://tlyecqezatjcgb:96ec013dbe30e7b521fb4cfb507eeb02289ebf578254c3592e0581e94e282d21@ec2-52-44-31-100.compute-1.amazonaws.com:5432/d77d7pkvqo39mr',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router.get('/', function(req, res, next){
  client.query('SELECT question_id, question, options, answer,o.id as answer_id FROM public."tbl_Questions" as q join public."tbl_Options" as o on q.id=o.question_id', (error, results) => {
    if (error) {
      throw error
    }
  
    let data=[];
    let result = results.rows;
    let question_ids = []

    result.map(q =>{
      let index = question_ids.indexOf(q.question_id);
      if(index == -1){

        question_ids.push(q.question_id);
  
        let obj={
          question : q.question,
          question_id : q.question_id,
          options: [{id:q.answer_id,value:q.options}],
          answer : q.answer,
        }
        data.push(obj)
      }
      else{
        data[index].options.push({id:q.answer_id,value:q.options})
      }
    })
    console.log(data)

  res.render('home', { title: 'Questions' , data});
  client.end()
  })
  
});

router.get('/questions', db.getQuestions)
router.get('/options', db.getOptions)
// router.get('/options/:id', db.getOptions)

module.exports = router;
