const { Op } = require("sequelize");
const { Product, TransactionItem, sequelize } = require("../models");

exports.addNewProduct = async (req, res) => {
  const { name, price, categoryId, description } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      image: filename,
      categoryId: categoryId,
      description: description,
      isActive: true,
    });

    return res.json({
      ok: true,
      message: "Product has been added to the listing",
      data: newProduct,
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: String(error) });
  }
};

exports.editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, categoryId, description, isActive } = req.body;
  
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      res.status(404).json({ ok: false, message: "Product not found" });
      return;
    }
    
    product.name = name;
    product.price = price;
    if (req.file) {
      product.image = req.file.filename;
    }
    product.categoryId = categoryId;
    product.description = description;
    product.isActive = isActive;
    await product.save();

    return res.json({ ok: true, data: product });
  } catch (error) {
    return res.status(400).json({ ok: false, message: String(error) });
  }
};

exports.handleGetSingleProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) {
      res.status(404).json({ ok: false, message: "Product not found" });
      return;
    }

    return res.json({ ok: true, data: product });
  } catch (error) {
    return res.status(400).json({ ok: false, message: String(error) });
  }
};

exports.handleGetProducts = async (req, res) => {
  const { sortType, sortAscend, category, nameFilter } = req.query;
  try {
    const queryStruct = {};
    if (!isNaN(category)) {
      queryStruct.categoryId = category;
    }

    if ((typeof nameFilter === "string") && (nameFilter)) {
      queryStruct.name = { [Op.substring]: nameFilter };
    }
    const products = await Product.findAll({
      order: sequelize.literal(
        `${
          ["id", "name", "price", "image", "createdAt"].includes(sortType)
            ? sortType
            : "createdAt"
        } ${sortAscend ? "ASC" : "DESC"}`
      ),
      where: queryStruct,
    });
    res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      message: err.message,
    });
  }
};

exports.handleGetProductsSales = async (req, res) => {
  const { sortType, sortAscend, category, nameFilter } = req.query;
  try {
    const queryStruct = {};
    if (!isNaN(category) && (category)) {
      queryStruct.categoryId = category;
    }

    if ((typeof nameFilter === "string") && (nameFilter)) {
      queryStruct.name = { [Op.substring]: nameFilter };
    }
    const products = await Product.findAll({
      order: sequelize.literal(
        `${
          ["id", "name", "price", "createdAt"].includes(sortType)
            ? sortType
            : "createdAt"
        } ${sortAscend ? "ASC" : "DESC"}`
      ),
      where: queryStruct,
      include: {
        model: TransactionItem,
        as: "TransactionItemData"
      }
    });
    res.status(200).json({
      ok: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      message: err.message,
    });
  }
};


exports.handleGetProductsPage = async (req, res) => {
  const { page } = req.params;
  const { sortType, sortAscend, category, nameFilter } = req.query;
  try {
    if (isNaN(page)) {
      throw new Error("Page must be a number");
    }
    const queryStruct = {};
    if (!isNaN(category) && (category)) {
      queryStruct.categoryId = category;
    }
    if ((typeof nameFilter === "string") && (nameFilter)) {
      queryStruct.name = { [Op.substring]: nameFilter };
    }
    const { count, rows } = await Product.findAndCountAll({
      order: [
        [(["id", "name", "price", "createdAt"].includes(sortType)? sortType : "createdAt"), 
        (sortAscend ? "ASC" : "DESC")]
      ],
      limit: 10,
      offset: 10 * page,
      where: queryStruct,
    });
    res.status(200).json({
      ok: true,
      data: rows,
      amount: count,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      ok: false,
      message: err.message,
    });
  }
};
