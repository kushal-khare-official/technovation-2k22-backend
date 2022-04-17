const express = require('express')
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

    const tokens = [
      'e4UJIJ7cwm_y2NoIOnn3jK:APA91bEVn7N15EjOL-RPv8hMePH1g6Ft3rV4e-6CvXqYCdEfmCEx2IYpXQZ2jqpgZKvZqZtlSLsKydmSL43vA9u9qg--dn2mv_VYsXYRoKlGYQo19aGP4j2ia93W1cJMAJRrAlxvpME5',
    ]

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
