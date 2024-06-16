const db = require("../model");
const { Op } = require("sequelize");

const Product = db.product;
const Category = db.category;

// thêm sản phẩm và chi tiết sản phẩm
const add = async (req, res) => {
  try {
    const { pr_name, pt_id, pr_amount, pr_price, pr_sales, ct_des1 } = req.body;
    const pr_image = req.file ? req.file.filename : null;
    const newProduct = {
      pr_name,
      pt_id,
      pr_amount,
      pr_price,
      pr_sales,
      pr_image,
    };
    const product = await Product.create(newProduct);
    const productId = product.id;
    const newCategory = {
      pr_id: productId,
      ct_des1,
    };
    const category = await Category.create(newCategory);
    res.status(201).json({
      message: "Sản phẩm đã được thêm thành công!",
      product,
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: "Đã xảy ra lỗi khi thêm sản phẩm.",
      error: error.message,
    });
  }
};
// lấy tất cả sản  phẩm
const getAllPro = async (req, res) => {
  let product = await Product.findAll({
    order: [["id", "desc"]],
  });
  res.status(200).send(product);
};
const updatePro = async (req, res) => {
  const id = req.params.id;
  try {
    const { pr_name, pt_id, pr_amount, pr_price, pr_sales, ct_des1 } = req.body;
    const pr_image = req.file ? req.file.filename : req.body.existingImage;
    const updateData = {
      pr_name,
      pt_id,
      pr_amount,
      pr_price,
      pr_sales,
      pr_image,
    };
    // console.log(id, req.body, pr_image);
    const updatedProduct = await Product.update(updateData, {
      where: { id: id },
    });
    await Category.update({ ct_des1 }, { where: { pr_id: id } });
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
// lấy sản phẩm , chi tiết sản phẩm
const getProductCate = async (req, res) => {
  const productId = req.params.id;

  const data = await Product.findOne({
    include: [
      {
        model: Category,
        as: "category",
      },
    ],
    where: { id: productId },
  });

  res.status(200).send(data);
};
// lấy sản phầm liên quan
const getProtype = async (req, res) => {
  const id = req.params.id;
  try {
    const detail = await Product.findOne({
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
      where: { id: id },
    });
    const data = await Product.findAll({
      where: {
        id: { [Op.ne]: detail.id },
        pt_id: detail.pt_id,
      },
    });
    res.status(200).send({ detail, data });
  } catch (error) {
    res.status(500).send({ error: "lỗi hệ thống." });
  }
};
// lấy tất cả sản phẩm theo danh mục
const getAlltype = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findAll({
      where: {
        pt_id: id,
      },
    });
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send({ error: "lỗi hệ thống." });
  }
};
// tìm kiếm sản phẩm
const searchProduct = async (req, res) => {
  const key = req.params.id; // Extract the specific parameter value
  try {
    const data = await Product.findAll({
      where: {
        pr_name: { [Op.like]: `%${key}%` },
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ error: "lỗi hệ thống." });
  }
};

module.exports = {
  add,
  getAllPro,
  updatePro,
  getProductCate,
  getProtype,
  getAlltype,
  searchProduct,
};
