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
var _SafeOnRampKit_pack
Object.defineProperty(exports, '__esModule', { value: true })
exports.SafeOnRampKit = void 0
/**
 * This class allows to initialize the Safe OnRamp Kit for convert fiat to crypto
 * @class SafeOnRampKit
 */
class SafeOnRampKit {
  /**
   * Initialize the SafeOnRampKit
   * @constructor
   * @param pack The pack implementing the SafeOnRampClient interface for the specific provider
   */
  constructor(pack) {
    _SafeOnRampKit_pack.set(this, void 0)
    __classPrivateFieldSet(this, _SafeOnRampKit_pack, pack, 'f')
  }
  /**
   * This method initializes the SafeOnRampKit asynchronously. This is the place where we can put initialization magic
   * @param pack The pack implementing the SafeOnRampClient interface for the specific provider
   * @param options The options to initialize the specific pack
   * @returns A SafeOnRampKit instance
   * @throws Error if the pack is not defined
   */
  static async init(pack, options) {
    if (!pack) {
      throw new Error('The pack is not defined')
    }
    await pack.init(options)
    return new this(pack)
  }
  /**
   * This method opens the onramp widget using the provided options
   * @param options The options to open the specific onramp widget. Should be different per provider
   */
  async open(options) {
    return await __classPrivateFieldGet(this, _SafeOnRampKit_pack, 'f').open(options)
  }
  /**
   * This method cleanup the onramp widget
   */
  async close() {
    await __classPrivateFieldGet(this, _SafeOnRampKit_pack, 'f').close()
  }
  /**
   * Subscribe to provider events
   * @param event The specific event to subscribe to
   * @param handler The handler to be called when the event is triggered
   */
  subscribe(event, handler) {
    __classPrivateFieldGet(this, _SafeOnRampKit_pack, 'f').subscribe(event, handler)
  }
  /**
   * Unsubscribe from provider events
   * @param event The specific event to unsubscribe from
   * @param handler The handler to be removed from the event
   */
  unsubscribe(event, handler) {
    __classPrivateFieldGet(this, _SafeOnRampKit_pack, 'f').unsubscribe(event, handler)
  }
}
exports.SafeOnRampKit = SafeOnRampKit
_SafeOnRampKit_pack = new WeakMap()
//# sourceMappingURL=SafeOnRampKit.js.map
