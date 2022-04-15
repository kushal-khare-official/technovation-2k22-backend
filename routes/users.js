const express = require("express");
const User = require("../models/users.js");
const router = express.Router();

/* GET users listing. */

router.post("/", async function (req, res, next) {
  try {
    const user = new User({
      uid: req.body.uid,
      name: req.body.name,
      email: req.body.email,
      userType: req.body.userType,
      collegeType: req.body.collegeType,
      college: req.body.college,
      branch: req.body.branch,
      year: req.body.year,
      mobile_number: req.body.mobile_number,
      kitNo: req.body.kitNo,
      kitTxnId: req.body.kitTxnId,
      kitTxnStatus: req.body.kitTxnStatus,
      tshirtSize: req.body.tshirtSize,
    });
    await user.save();
    //   const rid = req.body.rid
    //   const rUserOld = await User.findOne({ uid: rid }).exec()
    //   await User.updateOne({ uid: rid }, { reffered: rUserOld.reffered + 1 })
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const rid = req.header("rid");
    const rUser = await User.findOne({ uid: rid }).exec();

    if (!rUser || !rUser.userTYpe) return res.status(200).send(null);

    if (rUser.userType === "participant") return res.status(200).send(rUser);

    const users = req.query.kitNo
      ? await User.find({ kitNo: req.query.kitNo }).exec()
      : req.query.name
      ? User.find({ name: req.query.name }).exec()
      : await User.find().exec();

    return res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    const userOld = User.findOne({ uid: req.body.uid }).exec();
    await User.updateOne(
      { uid: req.body.uid },
      {
        name: userOld.name,
        email: req.body.email,
        userType: userOld.userType,
        collegeType: userOld.collegeType,
        college: userOld.college,
        branch: userOld.branch,
        year: userOld.year,
        mobile_number: userOld.mobile_number,
        kitNo: userOld.kitNo,
        kitTxnId: req.body.kitTxnId,
        kitTxnStatus: req.body.kitTxnStatus,
        tshirtSize: req.body.tshirtSize,
      }
    ).lean();
    //   const rid = req.body.rid
    //   const rUserOld = await User.findOne({ uid: rid }).exec()
    //   await User.updateOne({ uid: rid }, { reffered: rUserOld.reffered + 1 })
    return res.send(req.body.uid);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
