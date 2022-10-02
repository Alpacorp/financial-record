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
    check("name", "name bill is required").not().isEmpty(),
    check("category", "category bill is required").not().isEmpty(),
    check("detail", "detail bill is required").not().isEmpty(),
    check("amount", "amount bill is required").not().isEmpty(),
    check("date", "date bill is required").not().isEmpty(),
    check("type", "type bill is required").not().isEmpty(),
    check("paymethod", "paymethod bill is required").not().isEmpty(),
    validateInputs,
  ],
  createBill
);
router.get("/", getBills);
router.get("/:id", getBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);

module.exports = router;
