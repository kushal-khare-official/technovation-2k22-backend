const express = require('express')
const User = require('../models/users.js')
const router = express.Router()

router.get('/', async function (req, res, next) {
  try {
    const rid = req.header('rid')
    const rUser = await User.findOne({ uid: rid }).exec()

    if (!rUser || !rUser.userType)
      return res.status(200).send({ error: 'User Not Found' })

    if (rUser.userType === 'participant') return res.status(200).send(rUser)

    const users = req.query.kitNo
      ? await User.find({ kitNo: req.query.kitNo }).exec()
      : req.query.name
      ? User.find({ name: req.query.name }).exec()
      : await User.find().exec()

    return res.send(users)
  } catch (err) {
    return res.status(500).send(err)
  }
})

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body)
    const user = new User({
      uid: req.body.uid,
      name: req.body.name,
      userType: req.body.userType || 'participant',
      collegeType: req.body.collegeType || 'college',
      college: req.body.college || 'null',
      branch: req.body.branch || 'null',
      year: req.body.year || 0,
      mobile_number: req.body.mobile_number || 1000000000,
    })
    await user.save()
    return res.send(user)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

router.put('/form', async function (req, res, next) {
  try {
    await User.updateOne(
      { uid: req.body.uid },
      {
        collegeType: req.body.collegeType,
        college: req.body.college,
        branch: req.body.branch,
        year: req.body.year,
        mobile_number: req.body.mobile_number,
      }
    ).lean()
    return res.send(req.body.uid)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})

router.put('/form2', async function (req, res, next) {
  try {
    const userOld = User.findOne({ uid: req.body.uid }).exec()
    await User.updateOne(
      { uid: req.body.uid },
      {
        kitNo: userOld.kitNo,
        kitTxnId: req.body.kitTxnId,
        kitTxnStatus: req.body.kitTxnStatus,
        tshirtSize: req.body.tshirtSize,
      }
    ).lean()
    return res.send(req.body.uid)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
})
module.exports = router
