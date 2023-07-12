'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
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
var _AccountAbstraction_ethAdapter,
  _AccountAbstraction_signer,
  _AccountAbstraction_safeSdk,
  _AccountAbstraction_safeProxyFactoryContract,
  _AccountAbstraction_relayPack
Object.defineProperty(exports, '__esModule', { value: true })
const types_1 = require('./types')
const protocol_kit_1 = __importStar(require('@safe-global/protocol-kit'))
const ethers_1 = require('ethers')
const safeVersion = '1.3.0'
class AccountAbstraction {
  constructor(signer) {
    _AccountAbstraction_ethAdapter.set(this, void 0)
    _AccountAbstraction_signer.set(this, void 0)
    _AccountAbstraction_safeSdk.set(this, void 0)
    _AccountAbstraction_safeProxyFactoryContract.set(this, void 0)
    _AccountAbstraction_relayPack.set(this, void 0)
    if (!signer.provider) {
      throw new Error('Signer must be connected to a provider')
    }
    __classPrivateFieldSet(this, _AccountAbstraction_signer, signer, 'f')
    __classPrivateFieldSet(
      this,
      _AccountAbstraction_ethAdapter,
      new protocol_kit_1.EthersAdapter({
        ethers: ethers_1.ethers,
        signerOrProvider: __classPrivateFieldGet(this, _AccountAbstraction_signer, 'f')
      }),
      'f'
    )
  }
  async init(options) {
    const { relayPack } = options
    this.setRelayPack(relayPack)
    const signer = await this.getSignerAddress()
    const owners = [signer]
    const threshold = 1
    const saltNonce = protocol_kit_1.PREDETERMINED_SALT_NONCE
    const safeAccountConfig = {
      owners,
      threshold
    }
    const safeDeploymentConfig = {
      saltNonce,
      safeVersion
    }
    __classPrivateFieldSet(
      this,
      _AccountAbstraction_safeProxyFactoryContract,
      await (0, protocol_kit_1.getProxyFactoryContract)({
        ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
        safeVersion
      }),
      'f'
    )
    const safeAddress = await (0, protocol_kit_1.predictSafeAddress)({
      ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
      safeAccountConfig,
      safeDeploymentConfig
    })
    try {
      await (0, protocol_kit_1.getSafeContract)({
        ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
        safeVersion,
        customSafeAddress: safeAddress
      })
      __classPrivateFieldSet(
        this,
        _AccountAbstraction_safeSdk,
        await protocol_kit_1.default.create({
          ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
          safeAddress
        }),
        'f'
      )
    } catch {
      const predictedSafe = {
        safeAccountConfig,
        safeDeploymentConfig
      }
      __classPrivateFieldSet(
        this,
        _AccountAbstraction_safeSdk,
        await protocol_kit_1.default.create({
          ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
          predictedSafe
        }),
        'f'
      )
    }
  }
  setRelayPack(relayPack) {
    __classPrivateFieldSet(this, _AccountAbstraction_relayPack, relayPack, 'f')
  }
  async getSignerAddress() {
    const signerAddress = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_signer,
      'f'
    ).getAddress()
    return signerAddress
  }
  async getNonce() {
    if (!__classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f')) {
      throw new Error('SDK not initialized')
    }
    return __classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f').getNonce()
  }
  async getSafeAddress() {
    if (!__classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f')) {
      throw new Error('SDK not initialized')
    }
    return __classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f').getAddress()
  }
  async isSafeDeployed() {
    if (!__classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f')) {
      throw new Error('SDK not initialized')
    }
    return __classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f').isSafeDeployed()
  }
  async relayTransaction(transactions, options) {
    if (
      !__classPrivateFieldGet(this, _AccountAbstraction_relayPack, 'f') ||
      !__classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f') ||
      !__classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, 'f')
    ) {
      throw new Error('SDK not initialized')
    }
    const safeAddress = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_safeSdk,
      'f'
    ).getAddress()
    const standardizedSafeTx = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_relayPack,
      'f'
    ).createRelayedTransaction(
      __classPrivateFieldGet(this, _AccountAbstraction_safeSdk, 'f'),
      transactions,
      options
    )
    const safeSingletonContract = await (0, protocol_kit_1.getSafeContract)({
      ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
      safeVersion
    })
    const signedSafeTx = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_safeSdk,
      'f'
    ).signTransaction(standardizedSafeTx)
    const transactionData = safeSingletonContract.encode('execTransaction', [
      signedSafeTx.data.to,
      signedSafeTx.data.value,
      signedSafeTx.data.data,
      signedSafeTx.data.operation,
      signedSafeTx.data.safeTxGas,
      signedSafeTx.data.baseGas,
      signedSafeTx.data.gasPrice,
      signedSafeTx.data.gasToken,
      signedSafeTx.data.refundReceiver,
      signedSafeTx.encodedSignatures()
    ])
    let relayTransactionTarget = ''
    let encodedTransaction = ''
    const isSafeDeployed = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_safeSdk,
      'f'
    ).isSafeDeployed()
    if (isSafeDeployed) {
      relayTransactionTarget = safeAddress
      encodedTransaction = transactionData
    } else {
      const multiSendCallOnlyContract = await (0, protocol_kit_1.getMultiSendCallOnlyContract)({
        ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
        safeVersion
      })
      relayTransactionTarget = multiSendCallOnlyContract.getAddress()
      const safeSingletonContract = await (0, protocol_kit_1.getSafeContract)({
        ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
        safeVersion
      })
      const predictedSafe = {
        safeAccountConfig: {
          owners: [await this.getSignerAddress()],
          threshold: 1
        },
        safeDeploymentConfig: {
          saltNonce: protocol_kit_1.PREDETERMINED_SALT_NONCE
        }
      }
      const initializer = await (0, protocol_kit_1.encodeSetupCallData)({
        ethAdapter: __classPrivateFieldGet(this, _AccountAbstraction_ethAdapter, 'f'),
        safeContract: safeSingletonContract,
        safeAccountConfig: predictedSafe.safeAccountConfig
      })
      const safeDeploymentTransaction = {
        to: __classPrivateFieldGet(
          this,
          _AccountAbstraction_safeProxyFactoryContract,
          'f'
        ).getAddress(),
        value: '0',
        data: (0, protocol_kit_1.encodeCreateProxyWithNonce)(
          __classPrivateFieldGet(this, _AccountAbstraction_safeProxyFactoryContract, 'f'),
          safeSingletonContract.getAddress(),
          initializer
        ),
        operation: types_1.OperationType.Call
      }
      const safeTransaction = {
        to: safeAddress,
        value: '0',
        data: transactionData,
        operation: types_1.OperationType.Call
      }
      const multiSendData = (0, protocol_kit_1.encodeMultiSendData)([
        safeDeploymentTransaction,
        safeTransaction
      ])
      encodedTransaction = multiSendCallOnlyContract.encode('multiSend', [multiSendData])
    }
    const chainId = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_ethAdapter,
      'f'
    ).getChainId()
    const relayTransaction = {
      target: relayTransactionTarget,
      encodedTransaction: encodedTransaction,
      chainId,
      options
    }
    const response = await __classPrivateFieldGet(
      this,
      _AccountAbstraction_relayPack,
      'f'
    ).relayTransaction(relayTransaction)
    return response.taskId
  }
}
;(_AccountAbstraction_ethAdapter = new WeakMap()),
  (_AccountAbstraction_signer = new WeakMap()),
  (_AccountAbstraction_safeSdk = new WeakMap()),
  (_AccountAbstraction_safeProxyFactoryContract = new WeakMap()),
  (_AccountAbstraction_relayPack = new WeakMap())
exports.default = AccountAbstraction
//# sourceMappingURL=AccountAbstraction.js.map
