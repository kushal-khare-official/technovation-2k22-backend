const express = require("express");
const User = require("../models/users.js");
const router = express.Router();

/* GET users listing. */

router.post("/", async function (req, res, next) {
  try {
    const user = new User({
      uid: req.body.uid,
      name: req.body.name,
      userType: req.body.userType,
      collegeType: req.body.collegeType,
      college: req.body.college,
      branch: req.body.branch,
      year: req.body.year,
      mobile_number: req.body.mobile_number,
      kitNo: req.body.kitNo,
      kitTxnId: req.body.kitTxnId,
      kitTxnStatus: req.body.kitTxnStatus,
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
    const rid = req.body.rid;
    User.findOne({ uid: rid }).exec((err, rUser) => {
      if (err) return handleError(err);
      if (
        rUser.userType == "admin" ||
        rUser.userType == "coordinator" ||
        rUser.userType == "spoc" ||
        rUser.userType == "treasurer"
      ) {
        if (req.query.kitNo) {
          User.find({ kitNo: req.query.kitNo }).exec((err, users) => {
            if (err) return handleError(err);
            return res.send(users);
          });
        } else if (req.query.name) {
          User.find({ name: req.query.name }).exec((err, users) => {
            if (err) return handleError(err);
            return res.send(users);
          });
        } else
          User.find().exec((err, users) => {
            if (err) return handleError(err);
            return res.send(users);
          });
      } else {
        return res.status(401).send("Unauthorised Access");
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put("/", async function (req, res, next) {
  try {
    await User.updateOne({uid:req.body.uid},{
      name: req.body.name,
      userType: req.body.userType,
      collegeType: req.body.collegeType,
      college: req.body.college,
      branch: req.body.branch,
      year: req.body.year,
      mobile_number: req.body.mobile_number,
      kitNo: req.body.kitNo,
      kitTxnId: req.body.kitTxnId,
      kitTxnStatus: req.body.kitTxnStatus,
    }).lean();
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
