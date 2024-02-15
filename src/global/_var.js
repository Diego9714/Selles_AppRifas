require('dotenv').config()

/* ----------- SERVER ----------- */
const PORT                      = process.env.PORT

/* ----------- DATABASE ----------- */
const PG_HOST                   = process.env._HOST
const PG_USER                   = process.env._USER
const PG_PASS                   = process.env._PASS
const PG_NAME                   = process.env._NAME

/* ----------- ROUTES ----------- */

// Users
const GET_SELLER           = process.env.GET_SELLER
const REGISTER_SELLER           = process.env.REGISTER_SELLER
const EDIT_SELLER           = process.env.EDIT_SELLER
const DELETE_SELLER           = process.env.DELETE_SELLER


module.exports = {
	// Server
  PORT,
  // Database
  PG_HOST, PG_USER, PG_PASS, PG_NAME,
  // Sellers
  GET_SELLER, REGISTER_SELLER, EDIT_SELLER, DELETE_SELLER
 }
