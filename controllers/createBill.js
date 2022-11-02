const { response } = require("express");
const Bill = require("../models/Bill");

const createBill = async (req, res = response) => {
  const { name, category, detail, amount, date, type, paymethod, dues } =
    req.body;

  try {
    const newBill = new Bill({
      name,
      category,
      detail,
      amount,
      date,
      type,
      paymethod,
      dues,
    });
    await newBill.save();
    res.status(201).json({
      ok: true,
      msg: "Bill created",
      bill: newBill,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getBills = async (req, res = response) => {
  const bills = await Bill.find({}).sort({ date: -1 });
  res.json({
    ok: true,
    bills,
  });
};

const getBill = async (req, res = response) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({
        ok: false,
        msg: "Bill not found",
      });
    }
    res.json({
      ok: true,
      bill,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateBill = async (req, res = response) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({
        ok: false,
        msg: "Bill not found",
      });
    } else {
      const newBill = {
        ...req.body,
      };
      const billUpdated = await Bill.findByIdAndUpdate(id, newBill, {
        new: true,
      });
      res.json({
        ok: true,
        msg: "Bill updated",
        bill: billUpdated,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteBill = async (req, res = response) => {
  const { id } = req.params;
  try {
    const bill = await Bill.findById(id);
    if (!bill) {
      return res.status(404).json({
        ok: false,
        msg: "Bill not found",
      });
    } else {
      await Bill.findByIdAndDelete(id);
      res.json({
        ok: true,
        msg: "Bill deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  createBill,
  getBills,
  getBill,
  updateBill,
  deleteBill,
};
