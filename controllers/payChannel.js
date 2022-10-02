const { response } = require("express");
const PayChannel = require("../models/PayChannel");

const createPayChannel = async (req, res = response) => {
  const payChannel = new PayChannel(req.body);

  try {
    const payChannelDB = await payChannel.save();
    res.status(201).json({
      ok: true,
      payChannel: payChannelDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getPayChannels = async (req, res = response) => {
  const payChannels = await PayChannel.find({});
  res.json({
    ok: true,
    quanties: payChannels.length,
    payChannels,
  });
};

const getPayChannel = async (req, res = response) => {
  const { id } = req.params;
  try {
    const payChannel = await PayChannel.findById(id);
    if (!payChannel) {
      return res.status(404).json({
        ok: false,
        msg: "PayChannel not found",
      });
    }
    res.json({
      ok: true,
      payChannel,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updatePayChannel = async (req, res = response) => {
  const { id } = req.params;
  try {
    const payChannel = await PayChannel.findById(id);
    if (!payChannel) {
      return res.status(404).json({
        ok: false,
        msg: "PayChannel not found",
      });
    } else {
      const newPayChannel = {
        ...req.body,
      };
      const payChannelUpdated = await PayChannel.findByIdAndUpdate(
        id,
        newPayChannel,
        { new: true }
      );
      res.json({
        ok: true,
        payChannel: payChannelUpdated,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deletePayChannel = async (req, res = response) => {
  const { id } = req.params;
  try {
    const payChannel = await PayChannel.findById(id);
    if (!payChannel) {
      return res.status(404).json({
        ok: false,
        msg: "PayChannel not found",
      });
    }
    await PayChannel.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "PayChannel deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  createPayChannel,
  getPayChannels,
  getPayChannel,
  updatePayChannel,
  deletePayChannel,
};
