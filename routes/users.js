const express = require('express')
const User = require('../models/users.js')
const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const user = new User({
      uid: req.body.uid,
      name: req.body.name,
      college: req.body.college,
      branch: req.body.branch,
      year: req.body.year,
      mobile_number: req.body.mobile_number,
      reffered: 0,
    })
    await user.save()
    const rid = req.body.rid
    const rUserOld = await User.findOne({ uid: rid }).exec()
    await User.updateOne({ uid: rid }, { reffered: rUserOld.reffered + 1 })
    res.send(user)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

module.exports = router
