const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//reclam model

const EventSchema = new Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },

  date: {
    type: Date,
  },
  description: {
    type: String,
  },
  lat:{
    type:Number
  },
  lon:{
    type:Number
  }
});

module.exports = Event = mongoose.model("Event", EventSchema);
