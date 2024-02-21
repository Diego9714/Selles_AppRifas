const Sellers = require('../models/sellers.js')

const controller = {}

// ----- Save Seller -----
controller.regSeller = async (req, res) => {
  try {
    const { sellers } = req.body

    const filterSeller = Object.keys(sellers)

    if (filterSeller.length > 0) {
      const verify = await Sellers.verifySeller(sellers)

      const regSellers = verify.info.regSeller
      const sellerExists = verify.info.SellerExists

      let registeredSellers = []
      let existingSellers = []

      if (regSellers.length > 0) {
        const userSeller = await Sellers.regSeller(regSellers)

        registeredSellers = userSeller.completed.map(seller => seller.seller)
        existingSellers = sellerExists.map(seller => seller.email)
        
        res.status(userSeller.code).json({
          message: "Registration process completed",
          status: true,
          code: userSeller.code,
          registeredSellers: registeredSellers,
          existingSellers: existingSellers,
          notRegisteredSellers: userSeller.notCompleted
        })
      } else {
        res.status(500).json({ message: "All sellers are already registered", status: false, code: 500 })
      }
    } else {
      res.status(400).json({ message: "No sellers provided in the request", status: false, code: 400 })
    }
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
    console.log(error)
  }
}


// ----- Edit Seller -----
controller.editSeller = async (req, res) => {
  try {
    const { sellers } = req.body
    userSeller = await Sellers.editSeller(sellers)
    res.status(userSeller.code).json(userSeller)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

// ----- Delete Seller -----
controller.deleteSeller = async (req, res) => {
  try {
    const data = {id_seller , activation_status } = req.params

    userSeller = await Sellers.deleteSeller(data)
    res.status(userSeller.code).json(userSeller)
  
  } catch (error) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
