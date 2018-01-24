const arkjs = require('arkjs')
const blockchain = requireFrom('core/blockchainManager').getInstance()
const config = requireFrom('core/config')
const Transaction = requireFrom('model/transaction')

module.exports = (model) => {
  const lastBlock = blockchain.status.lastBlock
  const data = Transaction.deserialize(model.serialized.toString('hex'))

  return {
    id: data.id,
    block_id: model.blockId,
    type: data.type,
    amount: data.amount,
    fee: data.fee,
    sender: arkjs.crypto.getAddress(data.senderPublicKey, config.network.pubKeyHash),
    recipient: data.recipientId,
    signature: data.signature,
    asset: data.asset,
    confirmations: 0
    // this causes trouble with tests because the lastBlock is always empty...
    // confirmations: lastBlock ? lastBlock.data.height - model.block.height : 0
  }
}
