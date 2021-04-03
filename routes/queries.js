const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
})


// const getQuestions = (request, response) => {
//     pool.query('SELECT question_id, question, options, answer FROM public."tbl_Questions" as q join public."tbl_Options" as o on q.id=o.question_id', (error, results) => {
//       if (error) {
//         throw error
//       }
//       return response.status(200).send(results.rows)
//     })
//   }
const getQuestions = (request, response) => {
    pool.query('SELECT * FROM public."tbl_Questions"', (error, results) => {
      if (error) {
        throw error
      }
      return response.status(200).send(results.rows)
    })
  }
const getOptions = (req, response) => {
    pool.query(`SELECT * FROM public."tbl_Options"`, (error, results) => {
      if (error) {
        throw error
      }
      return response.status(200).send(results.rows)
    })
  }
// const getOptions = (req, response) => {
//     pool.query(`SELECT options FROM public."tbl_Options" where question_id=${req.params.id}`, (error, results) => {
//       if (error) {
//         throw error
//       }
//       return response.status(200).send(results.rows)
//     })
//   }


  module.exports = {
       getQuestions,
       getOptions
  }