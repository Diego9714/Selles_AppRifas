const pool = require('../utils/mysql.connect.js') 

const bcrypt = require("bcrypt")

// ----- Verify Seller -----
const verifySeller = async ({seller}) => {
  try {
    let msg = {
      status: false,
      message: "Seller already exists",
      code: 500
    }

    const connection = await pool.getConnection()

    const sql = `SELECT id_seller FROM sellers WHERE email = ?;`
    const [rows] = await connection.execute(sql, [email])

    const sqlSeller = `SELECT id_boss FROM chiefs WHERE email = ?;`
    const [rowsSeller] = await connection.execute(sqlSeller, [email])

    if (rows.length > 0 || rowsSeller.length > 0) {
      msg = {
        status: false,
        message: "Seller already exists",
        code: 500,
        name_user: fullname,
        address_user: address,
        email_user: email
      }
    } else {
      msg = {
        status: true,
        message: "New seller to register",
        code: 200,
        name_user: fullname,
        address_user: address,
        email_user: email
      }
    }
  

    connection.release()

    return msg
  } catch (err) {
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Save Seller -----
const regSeller = async ({seller}) => {
  try {
    let msg = {
      status: false,
      message: "Seller not Registered",
      code: 500
    }

    const connection = await pool.getConnection()

    const fechaActual = new Date()
    const date_created = fechaActual.toISOString().split('T')[0]

    const hash = await bcrypt.hash(password, 10)
    let sql = `INSERT INTO sellers ( id_boss , fullname , address , email, password , phone , direction , state , sector ,  activation_status , permit_level , date_created) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    const [result] = await connection.execute(sql, [id_boss , fullname , address , email, hash , phone , direction , state , sector , 1 , 2 , date_created])

    if (result.affectedRows > 0) {
      msg = {
        status: false,
        message: "Seller registered successfully",
        code: 200
      }
    }

    connection.release()


    return msg

  } catch (err) {
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get Sellers -----
const getSeller = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Sellers not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_seller , fullname, address , email, phone, direction, state , sector , date_created , activation_status FROM sellers WHERE id_boss = ? ;`
    let [seller] = await connection.execute(sql,[id_boss])

    if (seller.length > 0) {
      msg = {
        status: true,
        message: "Sellers found",
        data: seller,
        code: 200
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Edit Seller -----
const editSeller = async ({seller}) => {
  try {
    let msg = {
      status: false,
      message: "Seller not edited",
      code: 500
    }

    const connection = await pool.getConnection()

    const [verify] = await connection.execute(`SELECT id_seller FROM sellers WHERE id_seller = ?;`, [id_seller])

    if (verify.length > 0) {
      const hash = await bcrypt.hash(password, 10)

      const [result] = await connection.execute(`UPDATE sellers SET fullname = ?, address = ?, email = ? , password = ?, phone = ?, direction = ?, state = ? , sector = ? WHERE id_seller = ?;`, [fullname, address, email, hash, phone, direction, state , sector, id_seller])

      if (result.affectedRows > 0) {
        msg = {
          status: true,
          message: "Seller edited successfully",
          code: 200,
          seller: fullname
        }
      }
    } else {
      msg = {
        status: false,
        message: "Seller not found",
        code: 500,
        seller: fullname
      }
    }

    connection.release()
    

    return msg

  } catch (err) {
    console.log(err)
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Delete Seller -----
const deleteSeller = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Seller not activated",
      code: 500
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_seller FROM sellers WHERE id_seller = ? ;`
    let [verify] = await connection.execute(sql,[id_seller])

    if (verify.length > 0) {
    
      let updateSql = `UPDATE sellers SET activation_status = ? WHERE id_seller = ?;`;
      const seller = await connection.execute(updateSql, [activation_status , id_seller])

      if (seller.length > 0 && activation_status == 1) {

        let updateSql = `UPDATE clients SET activation_status = ? WHERE id_supervisor = ? AND type_supervisor = ? ;`;
        await connection.execute(updateSql, [1 , id_seller , "VED"])

        msg = {
          status: true,
          message: "Seller Activated succesfully",
          code: 200
        }
      }else if (seller.length > 0 && activation_status == 0) {

        let updateSql = `UPDATE clients SET activation_status = ? WHERE id_supervisor = ? AND type_supervisor = ? ;`;
        await connection.execute(updateSql, [0 , id_seller , "VED"])
        
        msg = {
          status: true,
          message: "Seller Disabled succesfully",
          code: 200
        }
      }
    }

    connection.release()

    return msg

  } catch (err) {
    console.log(err)
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

module.exports = {
  getSeller,
  verifySeller,
  regSeller,
  editSeller,
  deleteSeller
}
