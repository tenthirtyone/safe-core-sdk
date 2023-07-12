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
var _SafeAuthKit_instances, _SafeAuthKit_pack, _SafeAuthKit_config, _SafeAuthKit_getSafeCoreClient
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeAuthKit = void 0
const ethers_1 = require('ethers')
const api_kit_1 = __importDefault(require('@safe-global/api-kit'))
const protocol_kit_1 = require('@safe-global/protocol-kit')
const errors_1 = require('./lib/errors')
/**
 * SafeAuthKit provides a simple interface for web2 logins
 */
class SafeAuthKit {
  /**
   * Initialize the SafeAuthKit
   * @constructor
   * @param pack The pack implementing the SafeAuthClient interface
   * @param config The configuration options
   */
  constructor(pack, config) {
    _SafeAuthKit_instances.add(this)
    _SafeAuthKit_pack.set(this, void 0)
    _SafeAuthKit_config.set(this, void 0)
    __classPrivateFieldSet(this, _SafeAuthKit_pack, pack, 'f')
    __classPrivateFieldSet(this, _SafeAuthKit_config, config, 'f')
  }
  /**
   * The static method allows to initialize the SafeAuthKit asynchronously
   * @param providerType Choose the provider service to use
   * @param config The configuration including the one for the specific provider
   * @returns A SafeAuthKit instance
   * @throws Error if the provider type is not supported
   */
  static async init(pack, config) {
    if (!pack) {
      throw new Error('The pack is not defined')
    }
    await pack.init()
    return new this(pack, config)
  }
  /**
   * Authenticate the user
   * @returns the derived external owned account and the safes associated with the user if the txServiceUrl is provided
   * @throws Error if the provider was not created
   * @throws Error if there was an error while trying to get the safes for the current user using the provided txServiceUrl
   */
  async signIn() {
    var _a
    await __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').signIn()
    if (!__classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').provider) {
      throw new Error('Provider is not defined')
    }
    const ethersProvider = new ethers_1.ethers.providers.Web3Provider(
      __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').provider
    )
    const signer = ethersProvider.getSigner()
    const address = await signer.getAddress()
    let safes
    // Retrieve safes if txServiceUrl is provided
    if (
      (_a = __classPrivateFieldGet(this, _SafeAuthKit_config, 'f')) === null || _a === void 0
        ? void 0
        : _a.txServiceUrl
    ) {
      try {
        const safesByOwner = await __classPrivateFieldGet(
          this,
          _SafeAuthKit_instances,
          'm',
          _SafeAuthKit_getSafeCoreClient
        )
          .call(this)
          .getSafesByOwner(address)
        safes = safesByOwner.safes
      } catch (e) {
        throw new Error((0, errors_1.getErrorMessage)(e))
      }
    }
    this.safeAuthData = {
      eoa: address,
      safes
    }
    return this.safeAuthData
  }
  /**
   * Sign out the user
   */
  async signOut() {
    await __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').signOut()
    this.safeAuthData = undefined
  }
  /**
   *
   * @returns The Ethereum provider
   */
  getProvider() {
    var _a
    if (!__classPrivateFieldGet(this, _SafeAuthKit_pack, 'f')) return null
    return (_a = __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f')) === null || _a === void 0
      ? void 0
      : _a.provider
  }
  /**
   * Retrieve the user info
   */
  async getUserInfo() {
    var _a
    if (!__classPrivateFieldGet(this, _SafeAuthKit_pack, 'f')) return null
    return (_a = __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f')) === null || _a === void 0
      ? void 0
      : _a.getUserInfo()
  }
  /**
   * Subscribe to an event
   * @param eventName The event name to subscribe to. Choose from SafeAuthEvents type
   * @param listener The callback function to be called when the event is emitted
   */
  subscribe(event, listener) {
    __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').subscribe(event, listener)
  }
  /**
   * Unsubscribe from an event
   * @param eventName The event name to unsubscribe from. Choose from SafeAuthEvents type
   * @param listener The callback function to unsubscribe
   */
  unsubscribe(event, listener) {
    __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').unsubscribe(event, listener)
  }
}
exports.SafeAuthKit = SafeAuthKit
;(_SafeAuthKit_pack = new WeakMap()),
  (_SafeAuthKit_config = new WeakMap()),
  (_SafeAuthKit_instances = new WeakSet()),
  (_SafeAuthKit_getSafeCoreClient = function _SafeAuthKit_getSafeCoreClient() {
    var _a, _b
    if (
      !((_a = __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f')) === null || _a === void 0
        ? void 0
        : _a.provider)
    ) {
      throw new Error('Provider is not defined')
    }
    if (
      !((_b = __classPrivateFieldGet(this, _SafeAuthKit_config, 'f')) === null || _b === void 0
        ? void 0
        : _b.txServiceUrl)
    ) {
      throw new Error('txServiceUrl is not defined')
    }
    const provider = new ethers_1.ethers.providers.Web3Provider(
      __classPrivateFieldGet(this, _SafeAuthKit_pack, 'f').provider
    )
    const safeOwner = provider.getSigner(0)
    const adapter = new protocol_kit_1.EthersAdapter({
      ethers: ethers_1.ethers,
      signerOrProvider: safeOwner
    })
    return new api_kit_1.default({
      txServiceUrl: __classPrivateFieldGet(this, _SafeAuthKit_config, 'f').txServiceUrl,
      ethAdapter: adapter
    })
  })
//# sourceMappingURL=SafeAuthKit.js.map
