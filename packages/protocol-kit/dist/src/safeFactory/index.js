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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
var _SafeFactory_contractNetworks,
  _SafeFactory_isL1SafeMasterCopy,
  _SafeFactory_safeVersion,
  _SafeFactory_ethAdapter,
  _SafeFactory_safeProxyFactoryContract,
  _SafeFactory_gnosisSafeContract
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = require('../contracts/config')
const safeDeploymentContracts_1 = require('../contracts/safeDeploymentContracts')
const Safe_1 = __importDefault(require('../Safe'))
const utils_1 = require('../contracts/utils')
class SafeFactory {
  constructor() {
    _SafeFactory_contractNetworks.set(this, void 0)
    _SafeFactory_isL1SafeMasterCopy.set(this, void 0)
    _SafeFactory_safeVersion.set(this, void 0)
    _SafeFactory_ethAdapter.set(this, void 0)
    _SafeFactory_safeProxyFactoryContract.set(this, void 0)
    _SafeFactory_gnosisSafeContract.set(this, void 0)
  }
  static async create({
    ethAdapter,
    safeVersion = config_1.SAFE_LAST_VERSION,
    isL1SafeMasterCopy = false,
    contractNetworks
  }) {
    const safeFactorySdk = new SafeFactory()
    await safeFactorySdk.init({ ethAdapter, safeVersion, isL1SafeMasterCopy, contractNetworks })
    return safeFactorySdk
  }
  async init({ ethAdapter, safeVersion, isL1SafeMasterCopy, contractNetworks }) {
    __classPrivateFieldSet(this, _SafeFactory_ethAdapter, ethAdapter, 'f')
    __classPrivateFieldSet(this, _SafeFactory_safeVersion, safeVersion, 'f')
    __classPrivateFieldSet(this, _SafeFactory_isL1SafeMasterCopy, isL1SafeMasterCopy, 'f')
    __classPrivateFieldSet(this, _SafeFactory_contractNetworks, contractNetworks, 'f')
    const chainId = await __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f').getChainId()
    const customContracts =
      contractNetworks === null || contractNetworks === void 0 ? void 0 : contractNetworks[chainId]
    __classPrivateFieldSet(
      this,
      _SafeFactory_safeProxyFactoryContract,
      await (0, safeDeploymentContracts_1.getProxyFactoryContract)({
        ethAdapter,
        safeVersion,
        customContracts
      }),
      'f'
    )
    __classPrivateFieldSet(
      this,
      _SafeFactory_gnosisSafeContract,
      await (0, safeDeploymentContracts_1.getSafeContract)({
        ethAdapter,
        safeVersion,
        isL1SafeMasterCopy,
        customContracts
      }),
      'f'
    )
  }
  getEthAdapter() {
    return __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f')
  }
  getSafeVersion() {
    return __classPrivateFieldGet(this, _SafeFactory_safeVersion, 'f')
  }
  getAddress() {
    return __classPrivateFieldGet(this, _SafeFactory_safeProxyFactoryContract, 'f').getAddress()
  }
  async getChainId() {
    return __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f').getChainId()
  }
  async predictSafeAddress(safeAccountConfig, saltNonce = utils_1.PREDETERMINED_SALT_NONCE) {
    var _a
    const chainId = await __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f').getChainId()
    const customContracts =
      (_a = __classPrivateFieldGet(this, _SafeFactory_contractNetworks, 'f')) === null ||
      _a === void 0
        ? void 0
        : _a[chainId]
    const safeVersion = __classPrivateFieldGet(this, _SafeFactory_safeVersion, 'f')
    const safeDeploymentConfig = { saltNonce, safeVersion }
    return (0, utils_1.predictSafeAddress)({
      ethAdapter: __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f'),
      safeAccountConfig,
      safeDeploymentConfig,
      isL1SafeMasterCopy: __classPrivateFieldGet(this, _SafeFactory_isL1SafeMasterCopy, 'f'),
      customContracts
    })
  }
  async deploySafe({
    safeAccountConfig,
    saltNonce = utils_1.PREDETERMINED_SALT_NONCE,
    options,
    callback
  }) {
    var _a
    ;(0, utils_1.validateSafeAccountConfig)(safeAccountConfig)
    ;(0, utils_1.validateSafeDeploymentConfig)({ saltNonce })
    const signerAddress = await __classPrivateFieldGet(
      this,
      _SafeFactory_ethAdapter,
      'f'
    ).getSignerAddress()
    if (!signerAddress) {
      throw new Error('EthAdapter must be initialized with a signer to use this method')
    }
    const chainId = await this.getChainId()
    const customContracts =
      (_a = __classPrivateFieldGet(this, _SafeFactory_contractNetworks, 'f')) === null ||
      _a === void 0
        ? void 0
        : _a[chainId]
    const initializer = await (0, utils_1.encodeSetupCallData)({
      ethAdapter: __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f'),
      safeAccountConfig,
      safeContract: __classPrivateFieldGet(this, _SafeFactory_gnosisSafeContract, 'f'),
      customContracts
    })
    if (
      (options === null || options === void 0 ? void 0 : options.gas) &&
      (options === null || options === void 0 ? void 0 : options.gasLimit)
    ) {
      throw new Error('Cannot specify gas and gasLimit together in transaction options')
    }
    const safeAddress = await __classPrivateFieldGet(
      this,
      _SafeFactory_safeProxyFactoryContract,
      'f'
    ).createProxy({
      safeMasterCopyAddress: __classPrivateFieldGet(
        this,
        _SafeFactory_gnosisSafeContract,
        'f'
      ).getAddress(),
      initializer,
      saltNonce,
      options: {
        from: signerAddress,
        ...options
      },
      callback
    })
    const isContractDeployed = await __classPrivateFieldGet(
      this,
      _SafeFactory_ethAdapter,
      'f'
    ).isContractDeployed(safeAddress)
    if (!isContractDeployed) {
      throw new Error('SafeProxy contract is not deployed on the current network')
    }
    const safe = await Safe_1.default.create({
      ethAdapter: __classPrivateFieldGet(this, _SafeFactory_ethAdapter, 'f'),
      safeAddress,
      isL1SafeMasterCopy: __classPrivateFieldGet(this, _SafeFactory_isL1SafeMasterCopy, 'f'),
      contractNetworks: __classPrivateFieldGet(this, _SafeFactory_contractNetworks, 'f')
    })
    return safe
  }
}
;(_SafeFactory_contractNetworks = new WeakMap()),
  (_SafeFactory_isL1SafeMasterCopy = new WeakMap()),
  (_SafeFactory_safeVersion = new WeakMap()),
  (_SafeFactory_ethAdapter = new WeakMap()),
  (_SafeFactory_safeProxyFactoryContract = new WeakMap()),
  (_SafeFactory_gnosisSafeContract = new WeakMap())
exports.default = SafeFactory
//# sourceMappingURL=index.js.map
