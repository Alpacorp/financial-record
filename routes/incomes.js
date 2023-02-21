/*
  Routes incomes database
  host + /api/v1/incomes
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  createIncome,
  getIncomes,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomes");
const { validateInputs } = require("../middlewares/validateInputs");
const { validateJWT } = require("../middlewares/validateJWT");
const router = Router();

router.use(validateJWT);

router.post(
  "/new",
  [
    check("concept", "concept income is required").not().isEmpty(),
    check("detail", "detail income is required").not().isEmpty(),
    check("amount", "amount income is required").not().isEmpty(),
    check("date", "date income is required").not().isEmpty(),
    check("channel", "channel income is required").not().isEmpty(),
    check("paymethod", "paymethod income is required").not().isEmpty(),
    validateInputs,
  ],
  createIncome
);
router.get("/", getIncomes);
router.get("/:id", getIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

module.exports = router;
