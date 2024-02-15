const Sellers = require('../models/sellers.js')

const controller = {}

controller.getSellers = async (req, res) => {
  try {
    const data = { id_boss } = req.params
    const user  = await Sellers.getSeller(data)
    res.status(user.code).json(user)
  } catch (err) {
    res.status(500).json({ error: "Error al realizar la consulta" })
  }
}

module.exports = controller
