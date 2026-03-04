const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const sendCreditEmail = async (credit) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "Nuevo Crédito Registrado",
    html: `
      <h3>Nuevo Crédito Registrado</h3>
      <p><strong>Cliente:</strong> ${credit.client_name}</p>
      <p><strong>Valor:</strong> $${credit.amount}</p>
      <p><strong>Comercial:</strong> ${credit.sales_agent}</p>
      <p><strong>Fecha:</strong> ${new Date(credit.created_at).toLocaleString()}</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}

module.exports = { sendCreditEmail }