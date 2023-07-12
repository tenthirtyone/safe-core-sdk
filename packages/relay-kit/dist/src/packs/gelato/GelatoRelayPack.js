'use strict'
var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable')
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it')
    return (
      kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
      value
    )
  }
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter')
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError(
        'Cannot read private member from an object whose class did not declare it'
      )
    return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver)
  }
var _GelatoRelayPack_gelatoRelay, _GelatoRelayPack_apiKey
Object.defineProperty(exports, '__esModule', { value: true })
exports.GelatoRelayPack = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const relay_sdk_1 = require('@gelatonetwork/relay-sdk')
const constants_1 = require('../../constants')
class GelatoRelayPack {
  constructor(apiKey) {
    _GelatoRelayPack_gelatoRelay.set(this, void 0)
    _GelatoRelayPack_apiKey.set(this, void 0)
    __classPrivateFieldSet(this, _GelatoRelayPack_gelatoRelay, new relay_sdk_1.GelatoRelay(), 'f')
    __classPrivateFieldSet(this, _GelatoRelayPack_apiKey, apiKey, 'f')
  }
  _getFeeToken(gasToken) {
    return !gasToken || gasToken === constants_1.ZERO_ADDRESS
      ? constants_1.GELATO_NATIVE_TOKEN_ADDRESS
      : gasToken
  }
  getFeeCollector() {
    return constants_1.GELATO_FEE_COLLECTOR
  }
  async getEstimateFee(chainId, gasLimit, gasToken) {
    const feeToken = this._getFeeToken(gasToken)
    const estimation = await __classPrivateFieldGet(
      this,
      _GelatoRelayPack_gelatoRelay,
      'f'
    ).getEstimatedFee(chainId, feeToken, bignumber_1.BigNumber.from(gasLimit), true)
    return estimation.toString()
  }
  async getTaskStatus(taskId) {
    return __classPrivateFieldGet(this, _GelatoRelayPack_gelatoRelay, 'f').getTaskStatus(taskId)
  }
  async createRelayedTransaction(safe, transactions, options) {
    const { gasLimit, gasToken, isSponsored } = options
    const nonce = await safe.getNonce()
    if (isSponsored) {
      const sponsoredTransaction = await safe.createTransaction({
        safeTransactionData: transactions,
        options: {
          nonce
        }
      })
      return sponsoredTransaction
    }
    const chainId = await safe.getChainId()
    const estimation = await this.getEstimateFee(chainId, gasLimit, gasToken)
    const syncTransaction = await safe.createTransaction({
      safeTransactionData: transactions,
      options: {
        baseGas: estimation,
        gasPrice: '1',
        gasToken: gasToken !== null && gasToken !== void 0 ? gasToken : constants_1.ZERO_ADDRESS,
        refundReceiver: this.getFeeCollector(),
        nonce
      }
    })
    return syncTransaction
  }
  async sendSponsorTransaction(target, encodedTransaction, chainId) {
    if (!__classPrivateFieldGet(this, _GelatoRelayPack_apiKey, 'f')) {
      throw new Error('API key not defined')
    }
    const request = {
      chainId,
      target,
      data: encodedTransaction
    }
    const response = await __classPrivateFieldGet(
      this,
      _GelatoRelayPack_gelatoRelay,
      'f'
    ).sponsoredCall(request, __classPrivateFieldGet(this, _GelatoRelayPack_apiKey, 'f'))
    return response
  }
  async sendSyncTransaction(target, encodedTransaction, chainId, options) {
    const { gasLimit, gasToken } = options
    const feeToken = this._getFeeToken(gasToken)
    const request = {
      chainId,
      target,
      data: encodedTransaction,
      feeToken,
      isRelayContext: false
    }
    const relayRequestOptions = {
      gasLimit
    }
    const response = await __classPrivateFieldGet(
      this,
      _GelatoRelayPack_gelatoRelay,
      'f'
    ).callWithSyncFee(request, relayRequestOptions)
    return response
  }
  async relayTransaction({ target, encodedTransaction, chainId, options }) {
    const response = options.isSponsored
      ? this.sendSponsorTransaction(target, encodedTransaction, chainId)
      : this.sendSyncTransaction(target, encodedTransaction, chainId, options)
    return response
  }
}
exports.GelatoRelayPack = GelatoRelayPack
;(_GelatoRelayPack_gelatoRelay = new WeakMap()), (_GelatoRelayPack_apiKey = new WeakMap())
//# sourceMappingURL=GelatoRelayPack.js.map
