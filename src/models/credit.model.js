const pool = require("../config/db")

const createCredit = async (data) => {
  const query = `
    INSERT INTO credits 
    (client_name, client_id, amount, interest_rate, term_months, sales_agent)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `

  const values = [
    data.client_name,
    data.client_id,
    data.amount,
    data.interest_rate,
    data.term_months,
    data.sales_agent,
  ]

  const { rows } = await pool.query(query, values)
  return rows[0]
}

const getCredits = async (filters) => {
  let baseQuery = `FROM credits WHERE 1=1`
  const values = []
  let index = 1
  if (filters.search) {
    baseQuery += `
      AND (
        client_name ILIKE $${index}
        OR client_id ILIKE $${index}
        OR sales_agent ILIKE $${index}
      )
    `
    values.push(`%${filters.search}%`)
    index++
  }

  const allowedSortFields = ["amount", "created_at"]
  const sortField = allowedSortFields.includes(filters.sort)
    ? filters.sort
    : "created_at"

  const order = filters.order === "asc" ? "ASC" : "DESC"

  const page = parseInt(filters.page) || 1
  const limit = parseInt(filters.limit) || 5
  const offset = (page - 1) * limit

  const countQuery = `SELECT COUNT(*) ${baseQuery}`
  const countResult = await pool.query(countQuery, values)
  const total = parseInt(countResult.rows[0].count)

  const dataQuery = `
    SELECT * ${baseQuery}
    ORDER BY ${sortField} ${order}
    LIMIT $${index} OFFSET $${index + 1}
  `

  const dataValues = [...values, limit, offset]
  const { rows } = await pool.query(dataQuery, dataValues)

  return {
    data: rows,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

module.exports = {
  createCredit,
  getCredits,
}