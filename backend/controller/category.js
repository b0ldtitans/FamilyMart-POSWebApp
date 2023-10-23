const { Category } = require("../models");


exports.handleGetCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({})
    if (!categories) {
      return res.status(404).json({ ok: false, message: "There are no categories" });
  }
    res.status(200).json({
      ok: true,
      data: categories
    })
  } catch(err) {
    console.log(String(err))
      res.status(400).json({
          ok: false,
          message: err.message
      })
  }
}


exports.handleAddCategory = async (req, res) => {
  const { name, description } = req.body
  try {
    const newCate = await Category.create({
      name,
      description
    })
    res.status(200).json({
      ok: true,
      data: newCate
    })
  } catch(err) {
    res.status(400).json({
      ok: false,
      message: err.message
    })
  }
}

exports.handleGetCategoryById = async(req, res) => {
  const { id } = req.params
  try {
      const category = await Category.findOne({
          where: { id }
      })
      if (!category) {
          return res.status(404).json({ ok: false, message: "Category not found" });
      }
  } catch(err){
      res.status(400).json({ ok: false, message: err.message})
  }
}

exports.handleEditCategory = async (req, res) => {
  const { id } = req.params
  const { name, description } = req.body
  try {
    const category = await Category.findOne({
      where: { id }
    })
    if (!category) {
      return res.status(404).json({ ok: false, message: "Category not found" });
    }
    category.name = name
    category.description = description

    await category.save()
    res.status(200).json({
      ok: true,
      data: category,
    })
  } catch(err) {
      res.status(400).json({
          ok: false,
          message: err.message
      })
  }
}

exports.handleDeleteCategory = async (req, res) => {
  const { id } = req.params
  try {
      const category = await Category.destroy({ where: { id }})
      res.status(200).json({ ok: true, data: category})
  } catch(err) {
      res.status(400).json({ ok: false, message: err.message})
  }
}