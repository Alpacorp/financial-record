const { response } = require("express");
const Category = require("../models/Category");

const createCategory = async (req, res = response) => {
  const category = new Category(req.body);

  try {
    const categoryDB = await category.save();
    res.status(201).json({
      ok: true,
      category: categoryDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getCategories = async (req, res = response) => {
  const categories = await Category.find({});
  res.json({
    ok: true,
    quanties: categories.length,
    categories,
  });
};

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    }
    res.json({
      ok: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    }
    const newCategory = {
      ...req.body,
    };
    const categoryUpdated = await Category.findByIdAndUpdate(id, newCategory, {
      new: true,
    });
    res.json({
      ok: true,
      category: categoryUpdated,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "Category not found",
      });
    }
    await Category.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
