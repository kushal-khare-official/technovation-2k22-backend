const express = require("express");
const Event = require("../models/events.js");
const router = express.Router();

/* GET events listing. */

router.post("/", async function (req, res, next) {
  try {
    const event = new Event({
      eventId: req.body.eventId,
      image: req.body.image,
      description: req.body.description,
      coordinators: req.body.coordinators,
      name: req.body.name,
      teamType: req.body.teamType
    });
    await event.save();

    return res.send(event);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    Event.find().exec((err, events) => {
      if (err) return handleError(err);
      return res.send(events);
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
