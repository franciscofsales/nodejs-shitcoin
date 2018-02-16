const express = require('express')
const router = express.Router()
const { check } = require('express-validator/check')

const Shitcoin = require('../middleware/shitcoin')

const responseMiddleware = (req, res, next) => {
  return res.json(req.responseValue)
}

router.post('/transactions/new', [
  check('sender', 'Sender must be a String').exists(),
  check('recipient', 'Sender must be a String').exists(),
  check('amount', 'Sender must be a Int Value').isInt().exists()
], Shitcoin.newTransaction, responseMiddleware)

router.get('/mine', Shitcoin.mine, responseMiddleware)

router.get('/blockchain', Shitcoin.getChain, responseMiddleware)

module.exports = router
