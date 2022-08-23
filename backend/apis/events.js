const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.post("/addevent", (req, res) => {
  const { title, type, description, date, hour, lat, lon } = req.body;
  const nexEvent = new Event({
    title,
    type,
    description,
    date,
    hour,
    lat,
    lon,
  });
  nexEvent.save().then(() => res.send("success"));
});

router.get("/allevent", (req, res) => {
  Event.find().then((rest) => {
    console.log(rest);
    return res.send(rest);
  });
});

router.delete("/del/:id", (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id).then(() => {
    res.send("success");
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Event.findById(id).then((reslt) => {
    if(reslt){
      res.json(reslt)
    }else{
      res.json({})
    }
  });
});
module.exports = router;
