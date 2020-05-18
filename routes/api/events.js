const express = require('express');
const router = express.Router();
const {
  getEvents
} = require('../../DAL/events');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const data = await getEvents();
    res.send(data);
  } catch(err){
    console.log(err);
    res.send(500, 'Internal server error; check logs');
  };
});

module.exports = router;