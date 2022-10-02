const { Schema, model } = require("mongoose");

const payChannelSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
});

module.exports = model("PayChannel", payChannelSchema, "paychannels");
