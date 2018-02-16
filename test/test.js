const assert = require('assert')
const Shitcoin = require('../middleware/shitcoin')

// Get enviroment in the .env
require('dotenv').config()

describe('Shitcoin API', () => {
  describe('/getChain', () => {
    it('Should return the chain with the genesis block', () => {
      const req = {}
      Shitcoin.getChain(req, {}, () => {
        const chain = req.responseValue.chain
        assert.equal(chain.length, 1)
      })

    })
  })
  describe('/mine', () => {
    it('Should mine a new block into the chain', () => {
      const req = {}
      Shitcoin.mine(req, {}, () => {
        Shitcoin.getChain(req, {}, () => {
          const chain = req.responseValue.chain
          assert.equal(chain.length, 2)
        })
      })
    })
  })
  describe('/transaction/new', () => {
    it('Should add the new transactiong', () => {
      const req = {
        body: {
          sender: 'sender1-ABC',
          recipient: 'sender2-ABC',
          amount: 1
        }
      }
      Shitcoin.newTransaction(req, {}, () =>{
        Shitcoin.mine(req, {}, () => {
          Shitcoin.getChain(req, {}, () => {
            const chain = req.responseValue.chain
            const transactions = chain.slice(-1)[0].transactions
            assert.equal(transactions[0].sender, 'sender1-ABC')
          })
        })
      })
    })
  })
})