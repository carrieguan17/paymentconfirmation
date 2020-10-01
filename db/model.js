const db = require('./index.js')

module.exports = {

  createProfile: (profile, callback) => {
    db.query(`insert into f1 (name, email, password) values ("${profile.name}", "${profile.email}", "${profile.password}")`, (err, profile) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Profile created in DB')
      }
    })
  },

  addContact: (contact, callback) => {
    db.query(`insert into f2 (f1_id, shippingAddL1, shippingAddL2, city, state, zipCode, phoneNum) values ("${contact.currentUserId}", "${contact.shippingAddL1}", "${contact.shippingAddL2}", "${contact.city}", "${contact.state}", "${contact.zipCode}", "${contact.phoneNum}")`, (err, contact) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Contact info added to DB`)
      }
    })
  },

  addPayment: (payment, callback) => {
    db.query(`insert into f3 (f1_id, creditCard, expirationDate, cvv, billingZip) values ("${payment.currentUserId}", "${payment.creditCard}", "${payment.expirationDate}", "${payment.cvv}", "${payment.billingZip}")`, (err, contact) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`Payment info added to DB`)
      }
    })
  },

  getCurrentUserId: (callback) => {
    db.query(`select last_insert_id()`, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result)
      }
    })
  },

  getConfirmation: (callback) => {
    db.query(`select f1.*, f2.*, f3.*  from f1, f2, f3 where f1.id = f2.f1_id and f1.id = f3.f1_id and f3.id = (select last_insert_id())`, (err, result) => {
      if (err) {
        callback(err)
      } else {
        callback(null, result)
      }
    })
  }

}