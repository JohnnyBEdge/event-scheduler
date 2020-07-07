const express = require('express');
const router = express.Router();
const {
  getEvents,
  addEvent,
  deleteEvent,
  updateEventPUT,
  updateEventPATCH
} = require('../../DAL/events');

/* GET home page. */
router.get('/', async function(req, res) {
  try{
    const data = await getEvents();
    res.send(data);
  } catch(err){
    console.log(err);
    res.status(500).send("Internal server error; check logs");
  };
});

// POST
router.post('/', async function(req, res){
  try{
    const data = await addEvent(req.body);
    res.send(data);
  } catch(err){
    console.log(err);
    res.status(500).send("Internal server error; check logs");
  };
});

// DELETE
router.delete('/:id', async function(req, res){
  try{
    const data = await deleteEvent(req.params.id);
    console.log('dbData ', data)
    res.send(data);
  } catch(err){
    console.log(err);
    res.status(500).send("Internal server error; check logs");
  };
});

//PUT
router.put('/:id', async function(req, res){
  try{
    const data = await updateEventPUT(req.params.id, req.body);
    res.send(data);
  }catch(err){
    console.log(err);
    res.status(500).send("Internal server error; check logs");
  };
});

//PATCH
router.patch('/:id', async function(req, res){
  try{
    const data = await updateEventPATCH(req.params.id, req.body);
    res.send(data);
  }catch(err){
    console.log(err);
    res.status(500).send("Internal server error; check logs");
  };
});

module.exports = router;