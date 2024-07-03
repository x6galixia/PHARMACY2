const express = require('express')
const router = express.Router()
const methodOverride = require('method-override')

router.use(methodOverride('_method'))

router.delete('/logout', (req, res) => {
  req.logOut(err => {
    if (err) {
      return next(err)
    }
    res.redirect('/login')
  })
})

module.exports = router