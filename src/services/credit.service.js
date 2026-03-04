const creditModel = require("../models/credit.model");
const AppError = require("../utils/AppError");

const createCreditService = async (data) => {
  const {
    client_name,
    client_id,
    amount,
    interest_rate,
    term_months,
    sales_agent,
  } = data;

  const creditData = {
    client_name: client_name.trim(),
    client_id: client_id.trim(),
    amount: Number(amount),
    interest_rate: Number(interest_rate),
    term_months: Number(term_months),
    sales_agent: sales_agent.trim(),
  };

  return await creditModel.createCredit(creditData);
};

const getCreditsService = async (filters) => {
  return await creditModel.getCredits(filters);
};

module.exports = {
  createCreditService,
  getCreditsService,
};
