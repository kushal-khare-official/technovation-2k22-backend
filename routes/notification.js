const express = require('express')
const Device = require('../models/devices.js')
const router = express.Router()

const Notification = require('../models/notifications.js')
const { messaging } = require('../utils/firebaseInit')

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body)
    const event = new Notification({
      notificationId: req.body.notificationId,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      links: req.body.links,
    })
    await event.save()

    const devices = await Device.find().exec()

    const tokens = devices.map((device) => device.token)

    const data = {
      title: req.body.title,
      body: req.body.description,
      image: req.body.image,
    }

    const response = await messaging.sendMulticast({ tokens, data })
    console.log(response.responses[0])
    const successes = response.responses.filter(
      (r) => r.success === true
    ).length
    const failures = response.responses.filter(
      (r) => r.success === false
    ).length
    console.log(
      'Notifications sent:',
      `${successes} successful, ${failures} failed`
    )

    return res.send(event)
  } catch (err) {
    console.log(err)
    console.log('Error sending message:', err)
    return res.status(500).send(err)
  }
})

router.post('/new-device', async function (req, res, next) {
  try {
    console.log(req.body)

    const devices = await Device.find({ token: req.body.token }).exec()

    if (devices.length !== 0) return

    const device = new Device({
      token: req.body.token,
    })

    await device.save()

    const response = await messaging.sendMulticast({
      tokens: [req.body.token],
      data: {
        title: 'Dummy Notification',
        body: 'This is how you will receive a notification',
      },
    })

    const successes = response.responses.filter(
      (r) => r.success === true
    ).length
    const failures = response.responses.filter(
      (r) => r.success === false
    ).length
    console.log(
      'Notifications sent:',
      `${successes} successful, ${failures} failed`
    )

    return res.send('OK')
  } catch (err) {
    console.log(err)
    console.log('Error sending message:', err)
    return res.status(500).send(err)
  }
})

router.get('/', async function (req, res, next) {
  try {
    Notification.find().exec((err, events) => {
      if (err) return handleError(err)
      return res.send(events)
    })
  } catch (err) {
    return res.status(500).send(err)
  }
})

module.exports = router
