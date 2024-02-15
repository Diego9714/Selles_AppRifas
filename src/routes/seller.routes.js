const { GET_SELLER , REGISTER_SELLER , EDIT_SELLER , DELETE_SELLER } = require('../global/_var.js')

// Dependencies
const express = require('express')
const router = express.Router()

// Controllers
const dataController = require('../controllers/getInfo.controller.js')
const saveController = require('../controllers/saveInfo.controller.js')

// Routes
router.get(GET_SELLER , dataController.getSellers)

router.post(REGISTER_SELLER , saveController.regSeller)

router.post(EDIT_SELLER , saveController.editSeller)

router.post(DELETE_SELLER , saveController.deleteSeller)

module.exports = router
