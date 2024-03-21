const Sellers = require('../models/sellers.js')

const controller = {}

// ----- Save Seller -----
controller.regSeller = async (req, res) => {
  try {
    const seller = {id_boss , fullname , address , email , password , phone, direction, state , sector} = req.body

    const filterSeller = Object.keys(seller)

    if (filterSeller.length > 0) {
      const verify = await Sellers.verifySeller(seller)

      if (verify.code == 200) {    
        const processReg = await Sellers.regSeller(seller)        
        return res.status(processReg.code).json(processReg)       
      } else{      
        return res.status(verify.code).json(verify)      
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
    const seller = {id_seller , fullname , address , email , password , phone, direction, state , sector} = req.body

    userSeller = await Sellers.editSeller(seller)
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
