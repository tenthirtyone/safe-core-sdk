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
var _MoneriumPack_instances,
  _MoneriumPack_client,
  _MoneriumPack_config,
  _MoneriumPack_socket,
  _MoneriumPack_subscriptions,
  _MoneriumPack_startAuthCodeFlow,
  _MoneriumPack_startRefreshTokenFlow,
  _MoneriumPack_startAuthFlow,
  _MoneriumPack_addAccountIfNotLinked,
  _MoneriumPack_cleanQueryString
Object.defineProperty(exports, '__esModule', { value: true })
exports.MoneriumPack = void 0
const sdk_1 = require('@monerium/sdk')
const errors_1 = require('../../lib/errors')
const SafeMoneriumClient_1 = require('./SafeMoneriumClient')
const sockets_1 = require('./sockets')
const MONERIUM_CODE_VERIFIER = 'OnRampKit__monerium_code_verifier'
const SIGNATURE_MESSAGE = 'I hereby declare that I am the address owner.'
/**
 * This class implements the SafeOnRampClient interface for the Monerium provider
 * @class MoneriumPack
 */
class MoneriumPack {
  constructor(config) {
    _MoneriumPack_instances.add(this)
    _MoneriumPack_client.set(this, void 0)
    _MoneriumPack_config.set(this, void 0)
    _MoneriumPack_socket.set(this, void 0)
    _MoneriumPack_subscriptions.set(this, new Map())
    __classPrivateFieldSet(this, _MoneriumPack_config, config, 'f')
  }
  /**
   * Initializes the SafeMoneriumClient
   * @param options The MoneriumInitOptions object
   * @throws {Error} If the Monerium client is not initialized
   */
  async init(options) {
    if (!(options === null || options === void 0 ? void 0 : options.safeSdk)) {
      throw new Error('You need to provide an instance of the protocol kit')
    }
    __classPrivateFieldSet(
      this,
      _MoneriumPack_client,
      new SafeMoneriumClient_1.SafeMoneriumClient(
        __classPrivateFieldGet(this, _MoneriumPack_config, 'f').environment,
        options.safeSdk
      ),
      'f'
    )
  }
  /**
   * This method initialize the flow with Monerium in order to gain access to the resources
   * using the access_token. Return a initialized {@link SafeMoneriumClient}
   * @param options The MoneriumOpenOptions object
   * @returns A {@link SafeMoneriumClient} instance
   */
  async open(options) {
    var _a, _b, _c
    if (!__classPrivateFieldGet(this, _MoneriumPack_client, 'f')) {
      throw new Error('Monerium client not initialized')
    }
    try {
      const safeAddress = await __classPrivateFieldGet(
        this,
        _MoneriumPack_client,
        'f'
      ).getSafeAddress()
      if (options.authCode) {
        await __classPrivateFieldGet(
          this,
          _MoneriumPack_instances,
          'm',
          _MoneriumPack_startAuthCodeFlow
        ).call(this, options.authCode, safeAddress, options.redirectUrl || '')
      } else {
        if (options.refreshToken) {
          await __classPrivateFieldGet(
            this,
            _MoneriumPack_instances,
            'm',
            _MoneriumPack_startRefreshTokenFlow
          ).call(this, safeAddress, options.refreshToken)
        } else {
          await __classPrivateFieldGet(
            this,
            _MoneriumPack_instances,
            'm',
            _MoneriumPack_startAuthFlow
          ).call(this, safeAddress, options.redirectUrl || '')
        }
      }
      // When the user is authenticated, we connect to the order notifications socket in case
      // the user has subscribed to any event
      if (
        ((_a = __classPrivateFieldGet(this, _MoneriumPack_client, 'f').bearerProfile) === null ||
        _a === void 0
          ? void 0
          : _a.access_token) &&
        __classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f').size > 0
      ) {
        __classPrivateFieldSet(
          this,
          _MoneriumPack_socket,
          (0, sockets_1.connectToOrderNotifications)({
            profile:
              (_b = __classPrivateFieldGet(this, _MoneriumPack_client, 'f').bearerProfile) ===
                null || _b === void 0
                ? void 0
                : _b.profile,
            env: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').environment,
            accessToken:
              (_c = __classPrivateFieldGet(this, _MoneriumPack_client, 'f').bearerProfile) ===
                null || _c === void 0
                ? void 0
                : _c.access_token,
            subscriptions: __classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f')
          }),
          'f'
        )
      }
      return __classPrivateFieldGet(this, _MoneriumPack_client, 'f')
    } catch (error) {
      throw new Error((0, errors_1.getErrorMessage)(error))
    }
  }
  /**
   * Close the flow and clean up
   */
  async close() {
    var _a
    localStorage.removeItem(MONERIUM_CODE_VERIFIER)
    __classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f').clear()
    ;(_a = __classPrivateFieldGet(this, _MoneriumPack_socket, 'f')) === null || _a === void 0
      ? void 0
      : _a.close()
  }
  /**
   * Subscribe to MoneriumEvent to receive notifications using the Monerium API (WebSocket)
   * We are setting a subscription map because we need the user to have a token to start the WebSocket connection
   * {@link https://monerium.dev/api-docs#operation/profile-orders-notifications}
   * @param event The event to subscribe to
   * @param handler The handler to be called when the event is triggered
   */
  subscribe(event, handler) {
    __classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f').set(event, handler)
  }
  /**
   * Unsubscribe from MoneriumEvent and close the socket if there are no more subscriptions
   * @param event The event to unsubscribe from
   */
  unsubscribe(event) {
    var _a
    __classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f').delete(event)
    if (__classPrivateFieldGet(this, _MoneriumPack_subscriptions, 'f').size === 0) {
      ;(_a = __classPrivateFieldGet(this, _MoneriumPack_socket, 'f')) === null || _a === void 0
        ? void 0
        : _a.close()
      __classPrivateFieldSet(this, _MoneriumPack_socket, undefined, 'f')
    }
  }
}
exports.MoneriumPack = MoneriumPack
;(_MoneriumPack_client = new WeakMap()),
  (_MoneriumPack_config = new WeakMap()),
  (_MoneriumPack_socket = new WeakMap()),
  (_MoneriumPack_subscriptions = new WeakMap()),
  (_MoneriumPack_instances = new WeakSet()),
  (_MoneriumPack_startAuthCodeFlow =
    /**
     * This method authorize the user to access the resources using an access code
     * {@link https://monerium.dev/docs/getting-started/auth-flow#initiate}
     * @param codeParam The code param from the query string
     * @param safeAddress The address of the Safe
     * @param redirectUrl The redirect url from the Monerium UI
     */
    async function _MoneriumPack_startAuthCodeFlow(codeParam, safeAddress, redirectUrl) {
      if (!__classPrivateFieldGet(this, _MoneriumPack_client, 'f')) return
      const codeVerifier = sessionStorage.getItem(MONERIUM_CODE_VERIFIER) || ''
      await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').auth({
        client_id: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').clientId,
        code: codeParam,
        code_verifier: codeVerifier,
        redirect_uri: redirectUrl
      })
      await __classPrivateFieldGet(
        this,
        _MoneriumPack_instances,
        'm',
        _MoneriumPack_addAccountIfNotLinked
      ).call(this, safeAddress)
      __classPrivateFieldGet(
        this,
        _MoneriumPack_instances,
        'm',
        _MoneriumPack_cleanQueryString
      ).call(this)
      localStorage.removeItem(MONERIUM_CODE_VERIFIER)
    }),
  (_MoneriumPack_startRefreshTokenFlow =
    /**
     * This method starts the refresh token flow if the refresh token is provided in the MoneriumOpenOptions
     * {@link https://monerium.dev/docs/getting-started/client-credentials#get-access-token}
     * @param safeAddress The address od the Safe
     * @param refreshToken The refresh token
     */
    async function _MoneriumPack_startRefreshTokenFlow(safeAddress, refreshToken) {
      if (!__classPrivateFieldGet(this, _MoneriumPack_client, 'f')) return
      await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').auth({
        client_id: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').clientId,
        refresh_token: refreshToken
      })
      __classPrivateFieldGet(
        this,
        _MoneriumPack_instances,
        'm',
        _MoneriumPack_addAccountIfNotLinked
      ).call(this, safeAddress)
    }),
  (_MoneriumPack_startAuthFlow =
    /**
     * This private method starts the authorization code flow
     * {@link https://monerium.dev/docs/getting-started/auth-flow}
     * @param safeAddress The address of the Safe
     * @param redirectUrl The redirect url from the Monerium UI
     */
    async function _MoneriumPack_startAuthFlow(safeAddress, redirectUrl) {
      if (!__classPrivateFieldGet(this, _MoneriumPack_client, 'f')) return
      // Check if the user has already signed the message
      if (safeAddress) {
        // Check if the Safe has a completed transaction with the signature message
        const isSigned = await __classPrivateFieldGet(
          this,
          _MoneriumPack_client,
          'f'
        ).isMessageSigned(safeAddress, SIGNATURE_MESSAGE)
        if (!isSigned) {
          // Check if the Safe has a pending transaction with the signature message
          const isPending = await __classPrivateFieldGet(
            this,
            _MoneriumPack_client,
            'f'
          ).isSignMessagePending(safeAddress, SIGNATURE_MESSAGE)
          if (!isPending) {
            await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').signMessage(
              safeAddress,
              SIGNATURE_MESSAGE
            )
          }
        }
      }
      const authFlowUrl = __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getAuthFlowURI({
        client_id: __classPrivateFieldGet(this, _MoneriumPack_config, 'f').clientId,
        redirect_uri: redirectUrl,
        address: safeAddress,
        signature: '0x',
        chain: await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getChain(),
        network: await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getNetwork()
      })
      sessionStorage.setItem(
        MONERIUM_CODE_VERIFIER,
        __classPrivateFieldGet(this, _MoneriumPack_client, 'f').codeVerifier || ''
      )
      window.location.replace(authFlowUrl)
    }),
  (_MoneriumPack_addAccountIfNotLinked =
    /**
     * Add an address to the Monerium account if it is not already linked
     * @param safeAddress The address of the Safe
     */
    async function _MoneriumPack_addAccountIfNotLinked(safeAddress) {
      if (!__classPrivateFieldGet(this, _MoneriumPack_client, 'f')) return
      const authContext = await __classPrivateFieldGet(
        this,
        _MoneriumPack_client,
        'f'
      ).getAuthContext()
      if (!authContext) return
      const profile = await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getProfile(
        authContext.defaultProfile
      )
      if (profile) {
        const isSafeAddressLinked = profile.accounts.some(
          (account) => account.address === safeAddress
        )
        if (!isSafeAddressLinked) {
          await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').linkAddress(
            authContext.defaultProfile,
            {
              address: safeAddress,
              message: SIGNATURE_MESSAGE,
              signature: '0x',
              network: await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getNetwork(),
              chain: await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getChain(),
              accounts: [
                {
                  network: await __classPrivateFieldGet(
                    this,
                    _MoneriumPack_client,
                    'f'
                  ).getNetwork(),
                  chain: await __classPrivateFieldGet(this, _MoneriumPack_client, 'f').getChain(),
                  currency: sdk_1.Currency.eur
                }
              ]
            }
          )
        }
      }
    }),
  (_MoneriumPack_cleanQueryString = function _MoneriumPack_cleanQueryString() {
    const url = window.location.href
    const [baseUrl, queryString] = url.split('?')
    // Check if there is a query string
    if (queryString) {
      window.history.replaceState(null, '', baseUrl)
    }
  })
//# sourceMappingURL=MoneriumPack.js.map
