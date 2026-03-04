const {
  createCreditService,
  getCreditsService,
} = require("../services/credit.service");
const { sendCreditEmailJob } = require("../jobs/sendCreditEmail.job");
const { validationResult } = require("express-validator");

const createCredit = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const newCredit = await createCreditService(req.body);

    res.status(201).json(newCredit);

    setImmediate(() => {
      sendCreditEmailJob(newCredit);
    });
  } catch (error) {
    next(error);
  }
};

const getCredits = async (req, res, next) => {
  try {
    const credits = await getCreditsService(req.query);
    res.json(credits);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCredit,
  getCredits,
};
