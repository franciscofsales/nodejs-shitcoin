const crypto = require('crypto')

class Blockchain {
  constructor () {
    // Create empty chain and current transaction
    this.chain = []
    this.current_transactions = []

    this.newTransaction = this.newTransaction.bind(this)
    this.newBlock = this.newBlock.bind(this)
    this.hash = this.hash.bind(this)
    this.validNonce = this.validNonce.bind(this)
    this.lastBlock = this.lastBlock.bind(this)
    this.proofOfWork = this.proofOfWork.bind(this)
    // Mine genesis block
    this.newBlock(1, 1)
  }

  newBlock (nonce, previousHash) {
    const block = {
      index: this.chain.length + 1,
      timestamp: new Date(),
      transactions: this.current_transactions,
      nonce,
      previous_hash: previousHash
    }
    this.current_transactions = []
    this.chain.push(block)
    return block
  }

  newTransaction (sender, recipient, amount) {
    this.current_transactions.push({
      sender: sender,
      recipient: recipient,
      amount: amount
    })
    return this.lastBlock()['index'] + 1
  }

  hash (block) {
    const blockString = JSON.stringify(block)
    const hash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update(blockString)
    .digest('hex')

    return hash
  }

  validNonce (lastNonce, nonce) {
    const guessHash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
    .update(`${lastNonce}${nonce}`)
    .digest('hex')
    return guessHash.substr(0, 5) === process.env.RESOLUTION_HASH
  }

  proofOfWork (lastNonce) {
    let nonce = 0
    while (true) {
      if (!this.validNonce(lastNonce, nonce)) {
        nonce++
      } else {
        break
      }
    }
    return nonce
  }

  lastBlock () {
    return this.chain.slice(-1)[0]
  }
}

module.exports = Blockchain
