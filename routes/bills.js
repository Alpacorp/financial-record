/*
  Routes bills database
  host + /api/v1/bills
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createBill,
  getBills,
  getBill,
  updateBill,
  deleteBill,
} = require("../controllers/createBill");
const { validateInputs } = require("../middlewares/validateInputs");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

router.use(validateJWT);

router.post(
  "/new",
  [
    check("name", "name bill is required"),
    check("category", "category bill is required"),
    check("detail", "detail bill is required"),
    check("amount", "amount bill is required"),
    check("date", "date bill is required"),
    check("type", "type bill is required"),
    check("paymethod", "paymethod bill is required"),
    validateInputs,
  ],
  createBill
);
router.get("/", getBills);
router.get("/:id", getBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;
