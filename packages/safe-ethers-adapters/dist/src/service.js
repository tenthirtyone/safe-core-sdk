'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeService = void 0
const bignumber_1 = require('@ethersproject/bignumber')
const axios_1 = __importDefault(require('axios'))
class SafeService {
  constructor(serviceUrl, network) {
    this.serviceUrl = serviceUrl
    this.network = network !== null && network !== void 0 ? network : axios_1.default
  }
  /**
   * Estimates a Safe transaction
   *
   * @param safe - Address of the Safe for which this transaction should be estimated
   * @param safeTx - Safe transaction that should be estimated for execution
   * @returns A big number representing the safeTxGas for the passed Safe transaction
   */
  async estimateSafeTx(safe, safeTx) {
    const url = `${this.serviceUrl}/api/v1/safes/${safe}/multisig-transactions/estimations/`
    const resp = await this.network.post(url, safeTx)
    return bignumber_1.BigNumber.from(resp.data.safeTxGas)
  }
  /**
   * Load details for a Safe transaction
   *
   * @param safeTxHash - Hash of the Safe transaction
   * @returns A `SafeTxDetails` object that contains the details of a Safe transaction
   */
  async getSafeTxDetails(safeTxHash) {
    const url = `${this.serviceUrl}/api/v1/multisig-transactions/${safeTxHash}`
    const resp = await this.network.get(url)
    return resp.data
  }
  /**
   * Propose a new Safe transaction to the service
   *
   * @param safeAddress - Address of the Safe for which this transaction should be proposed
   * @param safeTxHash - Hash of the Safe transaction
   * @param safeTx - Safe transaction that should be proposed
   * @param signature - Signature of an owner or a delegate of an owner of the specified Safe to authorize the proposal
   * @returns The hash of the Safe transaction that has been proposed
   */
  async proposeTx(safeAddress, safeTxHash, safeTx, signature) {
    const url = `${this.serviceUrl}/api/v1/safes/${safeAddress}/multisig-transactions/`
    const data = {
      ...safeTx.data,
      contractTransactionHash: safeTxHash,
      sender: signature.signer,
      signature: signature.data
    }
    const resp = await this.network.post(url, data)
    return resp.data
  }
}
exports.SafeService = SafeService
//# sourceMappingURL=service.js.map
