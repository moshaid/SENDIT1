const _ = require('lodash');
const {Packages, validate} = require("../models/package");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  /*const pack = {
    id: packages.length + 1,
    userId: req.params.userId,
    receiverName: req.params.receiverName,
    receiverMobileNo: req.params.receiverMobileNo,
    receiverDestination: req.params.receiverDestination,
    pickUpLocation: req.params.pickUpLocation,
    status: "Processing"
  };*/

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  
  let validUser = Packages.findOne( {userId: req.body.userId} );
  if(validUser){
    validUser = new Packages (_.pick(req.body, ['userId', 'receiverName', 'receiverMobileNo', 'receiverDestination', 'pickUpLocation']));
    await validUser.save();
    res.send(validUser);
  }else{
    res.status(400).send('user must create account first');
  } 
});

router.get("/", async (req, res) => {
  const validUser = await Packages.find().sort('name');
  res.send(validUser);
});

router.get("/:id", async (req, res) => {
  const validUser = await Packages.findById(req.params.id);
  if (!validUser) return res.status(400).send("This requested user cannot be found");
  res.send(validUser);
});

router.get("/users/:id", async (req, res) => {
  const validUser = await Packages.findById(req.params.id);
  if (!validUser) return res.status(400).send("This user packages cannot be found");
  res.send(validUser);
});

router.put("/:id/update", async(req, res) => {
  let validUser = await Packages.findById(req.params.id);
  if(!validUser) res.status(400).send("The requsted package cannot tbe found");
  validUser = new Packages (_.pick(req.body, ['userId', 'receiverName', 'receiverMobileNo', 'receiverDestination', 'pickUpLocation']));
    await validUser.save();
    res.send(validUser);
});

module.exports = router;
