const { sendCreditEmail } = require("../services/email.service")

const sendCreditEmailJob = async (credit) => {
  try {
    await sendCreditEmail(credit)
    console.log("Email sent successfully")
  } catch (error) {
    console.error("Email error:", error.message)
  }
}

module.exports = { sendCreditEmailJob }