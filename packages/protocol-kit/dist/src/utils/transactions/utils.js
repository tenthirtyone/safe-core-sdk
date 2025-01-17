'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.isSafeMultisigTransactionResponse =
  exports.isMetaTransactionArray =
  exports.decodeMultiSendData =
  exports.encodeMultiSendData =
  exports.standardizeSafeTransactionData =
  exports.standardizeMetaTransactionData =
    void 0
const abi_1 = require('@ethersproject/abi')
const bytes_1 = require('@ethersproject/bytes')
const solidity_1 = require('@ethersproject/solidity')
const utils_1 = require('../../utils')
const constants_1 = require('../../utils/constants')
const config_1 = require('../../contracts/config')
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const web3_utils_1 = require('web3-utils')
const gas_1 = require('./gas')
function standardizeMetaTransactionData(tx) {
  var _a
  const standardizedTxs = {
    ...tx,
    operation:
      (_a = tx.operation) !== null && _a !== void 0 ? _a : safe_core_sdk_types_1.OperationType.Call
  }
  return standardizedTxs
}
exports.standardizeMetaTransactionData = standardizeMetaTransactionData
async function standardizeSafeTransactionData({ safeContract, predictedSafe, ethAdapter, tx }) {
  var _a, _b, _c, _d, _e
  const standardizedTxs = {
    to: tx.to,
    value: tx.value,
    data: tx.data,
    operation:
      (_a = tx.operation) !== null && _a !== void 0 ? _a : safe_core_sdk_types_1.OperationType.Call,
    baseGas: (_b = tx.baseGas) !== null && _b !== void 0 ? _b : '0',
    gasPrice: (_c = tx.gasPrice) !== null && _c !== void 0 ? _c : '0',
    gasToken: tx.gasToken || constants_1.ZERO_ADDRESS,
    refundReceiver: tx.refundReceiver || constants_1.ZERO_ADDRESS,
    nonce:
      (_d = tx.nonce) !== null && _d !== void 0
        ? _d
        : safeContract
        ? await safeContract.getNonce()
        : 0
  }
  if (typeof tx.safeTxGas !== 'undefined') {
    return {
      ...standardizedTxs,
      safeTxGas: tx.safeTxGas
    }
  }
  let safeVersion
  if (predictedSafe) {
    safeVersion =
      ((_e =
        predictedSafe === null || predictedSafe === void 0
          ? void 0
          : predictedSafe.safeDeploymentConfig) === null || _e === void 0
        ? void 0
        : _e.safeVersion) || config_1.SAFE_LAST_VERSION
  } else {
    if (!safeContract) {
      throw new Error('Safe is not deployed')
    }
    safeVersion = await safeContract.getVersion()
  }
  const hasSafeTxGasOptional = (0, utils_1.hasSafeFeature)(
    utils_1.SAFE_FEATURES.SAFE_TX_GAS_OPTIONAL,
    safeVersion
  )
  if (
    (hasSafeTxGasOptional && standardizedTxs.gasPrice === '0') ||
    (hasSafeTxGasOptional && predictedSafe)
  ) {
    return {
      ...standardizedTxs,
      safeTxGas: '0'
    }
  }
  if (!safeContract) {
    throw new Error('Safe is not deployed')
  }
  const safeTxGas = await (0, gas_1.estimateTxGas)(
    safeContract,
    ethAdapter,
    standardizedTxs.to,
    standardizedTxs.value,
    standardizedTxs.data,
    standardizedTxs.operation
  )
  return {
    ...standardizedTxs,
    safeTxGas
  }
}
exports.standardizeSafeTransactionData = standardizeSafeTransactionData
function encodeMetaTransaction(tx) {
  const data = (0, bytes_1.arrayify)(tx.data)
  const encoded = (0, solidity_1.pack)(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [tx.operation, tx.to, tx.value, data.length, data]
  )
  return encoded.slice(2)
}
function encodeMultiSendData(txs) {
  return '0x' + txs.map((tx) => encodeMetaTransaction(tx)).join('')
}
exports.encodeMultiSendData = encodeMultiSendData
function decodeMultiSendData(encodedData) {
  const multiSendInterface = new abi_1.Interface([
    'function multiSend(bytes memory transactions) public payable'
  ])
  const [decodedData] = multiSendInterface.decodeFunctionData('multiSend', encodedData)
  const txs = []
  // Decode after 0x
  let index = 2
  while (index < decodedData.length) {
    // As we are decoding hex encoded bytes calldata, each byte is represented by 2 chars
    // uint8 operation, address to, value uint256, dataLength uint256
    const operation = `0x${decodedData.slice(index, (index += 2))}`
    const to = `0x${decodedData.slice(index, (index += 40))}`
    const value = `0x${decodedData.slice(index, (index += 64))}`
    const dataLength = parseInt(decodedData.slice(index, (index += 64)), 16) * 2
    const data = `0x${decodedData.slice(index, (index += dataLength))}`
    txs.push({
      operation: (0, web3_utils_1.hexToNumber)(operation),
      to: (0, web3_utils_1.toChecksumAddress)(to),
      value: (0, web3_utils_1.hexToNumberString)(value),
      data
    })
  }
  return txs
}
exports.decodeMultiSendData = decodeMultiSendData
function isMetaTransactionArray(safeTransactions) {
  return (
    (safeTransactions === null || safeTransactions === void 0
      ? void 0
      : safeTransactions.length) !== undefined
  )
}
exports.isMetaTransactionArray = isMetaTransactionArray
function isSafeMultisigTransactionResponse(safeTransaction) {
  return safeTransaction.isExecuted !== undefined
}
exports.isSafeMultisigTransactionResponse = isSafeMultisigTransactionResponse
//# sourceMappingURL=utils.js.map
