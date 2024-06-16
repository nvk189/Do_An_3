const db = require("../model");

//create

const Import = db.import;
const ImportDetail = db.importDetail;
const Product = db.product;
const add = async (req, res) => {
  const { sl_id, pp_start, pp_amonut, pp_price, products } = req.body;

  try {
    // Create the import bill
    const importBill = await Import.create({
      sl_id,
      pp_start,
      pp_amonut,
      pp_price,
    });

    const importDetails = await Promise.all(
      products.map(async (product) => {
        const { pr_id, ip_amount, ip_price } = product;
        return await ImportDetail.create({
          pp_id: importBill.id,
          pr_id,
          ip_amount,
          ip_price,
        });
      })
    );

    // Respond with the created import bill and its details
    res.status(200).json({ importBill, importDetails });
  } catch (error) {
    console.error("Error while adding import bill:", error);
    res.status(500).json({ error: "Failed to add import bill" });
  }
};

const getAll = async (req, res) => {
  let prImport = await Import.findAll({
    order: [["id", "desc"]],
  });
  res.status(200).send(prImport);
};

const update = async (req, res) => {
  let id = req.params.id;
  let prImport = await Import.update(req.body, { where: { id: id } });
  res.status(200).send(prImport);
};

const getproImport = async (req, res) => {
  const id = req.params.id;
  const data = await Import.findAll({
    include: [
      {
        model: ImportDetail,
        as: "importdetail",
        include: [
          {
            model: Product,
            as: "importproduct",
            attributes: ["pr_name", "pr_image"],
          },
        ],
      },
    ],
    where: { id: id },
  });

  res.status(200).send(data);
};

module.exports = {
  add,
  getAll,
  update,
  getproImport,
};
