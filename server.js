// import dependencies
const express = require('express');
const app = express();
const path = require('path');
const filePath = path.join(__dirname, './public');
const ENDPOINT = "/checkout";
const ENDPOINT2 = "/confirmation";
const PORT = '3000';
const model = require('./db/model.js')

// middleware
app.use((req, res, next) => {
  console.log(`${req.method} received for ${req.path}`);
  next()
})
app.use(express.static(filePath))
app.use(express.json())

// routes
app.post(ENDPOINT, (req, res) => {
  if (req.body['form'] === 'f1') {
    model.createProfile(req.body)
    res.status(201)
    res.send(req.body)
  } else if (req.body['form'] === 'f2') {
    model.addContact(req.body)
    res.status(201)
    res.send(req.body)
  } else if (req.body['form'] === 'f3') {
    model.addPayment(req.body)
    res.status(201)
    res.send(req.body)
  }
})

app.get(ENDPOINT, (req, res) => {
  model.getCurrentUserId((err, result) => {
    if (err) {
      res.status(404)
      console.log(err)
    } else {
      res.status(201)
      res.send(result)
    }
  })
})

app.get(ENDPOINT2, (req, res) => {
  model.getConfirmation((err, result) => {
    if (err) {
      res.status(404)
      console.log(err)
    } else {
      res.status(201)
      res.send(result)
    }
  })
})

// start server
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`)
})

