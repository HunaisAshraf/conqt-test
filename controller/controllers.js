const connection = require("../config/db");

const getVendorUsers = async (req, res) => {
  try {
    const { prId, custOrgId } = req.query;
    const suppliers = [];
    connection.query(
      `SELECT suppliers FROM PrLineItems WHERE 	purchaseRequestId = ? AND custOrgId = ?`,
      [prId, custOrgId],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, message: "item not found" });
        }
        for (let result of results) {
          let supplierId = result.suppliers.split(",");
          for (let sup of supplierId) {
            if (!suppliers.includes(sup)) {
              suppliers.push(sup);
            }
          }
        }

        connection.query(
          "SELECT Name,UserName,VendorOrganizationId as supplierId from VendorUsers WHERE VendorOrganizationId IN (?)",
          [suppliers],
          (error, results) => {
            if (error) {
              return res
                .status(400)
                .json({ success: false, message: "item not found" });
            }
            return res.status(200).json({
              success: true,
              message: "successfully retrieved items",
              results,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error in fetching data" });
  }
};

module.exports = getVendorUsers;
