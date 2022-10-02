const { response } = require("express");
const Income = require("../models/Income");

const createIncome = async (req, res = response) => {
  const income = new Income(req.body);

  try {
    const incomeDB = await income.save();
    res.status(201).json({
      ok: true,
      income: incomeDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getIncomes = async (req, res = response) => {
  const incomes = await Income.find({});
  res.json({
    ok: true,
    quanties: incomes.length,
    incomes,
  });
};

const getIncome = async (req, res = response) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({
        ok: false,
        msg: "Income not found",
      });
    }
    res.json({
      ok: true,
      income,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateIncome = async (req, res = response) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({
        ok: false,
        msg: "Income not found",
      });
    } else {
      const newIncome = {
        ...req.body,
      };
      const incomeUpdated = await Income.findByIdAndUpdate(id, newIncome, {
        new: true,
      });
      res.json({
        ok: true,
        income: incomeUpdated,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteIncome = async (req, res = response) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({
        ok: false,
        msg: "Income not found",
      });
    }
    await Income.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Income deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
};
