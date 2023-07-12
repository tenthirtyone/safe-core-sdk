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
var _Web3AuthModalPack_options, _Web3AuthModalPack_adapters, _Web3AuthModalPack_modalConfig
Object.defineProperty(exports, '__esModule', { value: true })
exports.Web3AuthModalPack = void 0
const modal_1 = require('@web3auth/modal')
const errors_1 = require('../../lib/errors')
/**
 * Web3AuthModalPack implements the SafeAuthClient interface for adapting the Web3Auth service provider
 * @class
 */
class Web3AuthModalPack {
  /**
   *
   * @param options Web3Auth options {@link https://web3auth.io/docs/sdk/web/modal/initialize#arguments}
   * @param config Web3Auth adapters {@link https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters}
   * @param modalConfig The modal configuration {@link https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization}
   */
  constructor(options, adapters, modalConfig) {
    _Web3AuthModalPack_options.set(this, void 0)
    _Web3AuthModalPack_adapters.set(this, void 0)
    _Web3AuthModalPack_modalConfig.set(this, void 0)
    this.provider = null
    __classPrivateFieldSet(this, _Web3AuthModalPack_options, options, 'f')
    __classPrivateFieldSet(this, _Web3AuthModalPack_adapters, adapters, 'f')
    __classPrivateFieldSet(this, _Web3AuthModalPack_modalConfig, modalConfig, 'f')
  }
  /**
   * Initialize the Web3Auth service provider
   * @throws Error if there was an error initializing Web3Auth
   */
  async init() {
    var _a
    try {
      this.web3authInstance = new modal_1.Web3Auth(
        __classPrivateFieldGet(this, _Web3AuthModalPack_options, 'f')
      )
      ;(_a = __classPrivateFieldGet(this, _Web3AuthModalPack_adapters, 'f')) === null ||
      _a === void 0
        ? void 0
        : _a.forEach((adapter) => {
            var _a
            return (_a = this.web3authInstance) === null || _a === void 0
              ? void 0
              : _a.configureAdapter(adapter)
          })
      await this.web3authInstance.initModal({
        modalConfig: __classPrivateFieldGet(this, _Web3AuthModalPack_modalConfig, 'f')
      })
      this.provider = this.web3authInstance.provider
    } catch (e) {
      throw new Error((0, errors_1.getErrorMessage)(e))
    }
  }
  /**
   * Connect to the Web3Auth service provider
   * @returns
   */
  async signIn() {
    if (!this.web3authInstance) {
      throw new Error('Web3AuthModalPack is not initialized')
    }
    this.provider = await this.web3authInstance.connect()
  }
  /**
   * Disconnect from the Web3Auth service provider
   */
  async signOut() {
    if (!this.web3authInstance) {
      throw new Error('Web3AuthModalPack is not initialized')
    }
    this.provider = null
    await this.web3authInstance.logout()
  }
  /**
   * Get authenticated user information
   * @returns The user info
   */
  async getUserInfo() {
    if (!this.web3authInstance) {
      throw new Error('Web3AuthModalPack is not initialized')
    }
    const userInfo = await this.web3authInstance.getUserInfo()
    return userInfo
  }
  /**
   * Allow to subscribe to the Web3Auth events
   * @param event The event you want to subscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  subscribe(event, handler) {
    var _a
    ;(_a = this.web3authInstance) === null || _a === void 0 ? void 0 : _a.on(event, handler)
  }
  /**
   * Allow to unsubscribe to the Web3Auth events
   * @param event The event you want to unsubscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  unsubscribe(event, handler) {
    var _a
    ;(_a = this.web3authInstance) === null || _a === void 0 ? void 0 : _a.off(event, handler)
  }
}
exports.Web3AuthModalPack = Web3AuthModalPack
;(_Web3AuthModalPack_options = new WeakMap()),
  (_Web3AuthModalPack_adapters = new WeakMap()),
  (_Web3AuthModalPack_modalConfig = new WeakMap())
//# sourceMappingURL=Web3AuthModalPack.js.map
