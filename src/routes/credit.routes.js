const express = require("express");
const router = express.Router();
const creditController = require("../controllers/credit.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/",
  body("client_name").notEmpty().withMessage("Client name is required"),
  body("client_id").notEmpty().withMessage("Client ID is required"),
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number")
    .notEmpty()
    .withMessage("Amount is required"),
  body("interest_rate")
    .isNumeric()
    .withMessage("Interest rate must be a number"),
  body("term_months")
    .isInt({ min: 1 })
    .withMessage("Term months must be an integer greater than 0"),
  body("sales_agent").notEmpty().withMessage("Sales agent is required"),
  authMiddleware,
  creditController.createCredit,
);
router.get("/", authMiddleware, creditController.getCredits);
module.exports = router;
