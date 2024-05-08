const express = require('express');
const router = express.Router();
const Phone = require('../models/phone.js');

// Display form to add a new phone
router.get('/phones/new', (req, res) => {
  res.render('phones/new');
});

// Create a new phone
router.post('/phones', async (req, res) => {
  const phone = new Phone(req.body.phone);
  await phone.save();
  res.redirect(`/phones/${phone._id}`);
});

// Show a phone
router.get('/phones/:id', async (req, res) => {
  const phone = await Phone.findById(req.params.id).populate('user');
  res.render('phones/phone', { phone });
});

// Delete a phone
router.delete('/phones/:id', async (req, res) => {
  await Phone.findByIdAndDelete(req.params.id);
  res.redirect('/phones');
});


//get all
router.get('/phones', async (req, res) => {
    try {
      const phones = await Phone.find({});
      res.render('phones/phones', { phones }); // Assuming you have an 'index.ejs' file under '/views/phones'
    } catch (error) {
      console.error(error);
      res.send("Error fetching phones");
    }
  });

module.exports = router;