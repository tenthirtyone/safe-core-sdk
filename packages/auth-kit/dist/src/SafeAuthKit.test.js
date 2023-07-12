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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const base_1 = require('@web3auth/base')
const web3AuthModal = __importStar(require('@web3auth/modal'))
const SafeAuthKit_1 = require('./SafeAuthKit')
const Web3AuthModalPack_1 = require('./packs/web3auth/Web3AuthModalPack')
const eth_testing_1 = require('eth-testing')
const events_1 = __importDefault(require('events'))
const testingUtils = (0, eth_testing_1.generateTestingUtils)({ providerType: 'MetaMask' })
const mockProvider = testingUtils.getProvider()
const mockInitModal = jest.fn()
const mockConnect = jest.fn().mockImplementation(() => {
  eventEmitter.emit(base_1.ADAPTER_EVENTS.CONNECTED)
  return Promise.resolve(mockProvider)
})
const eventEmitter = new events_1.default()
const mockLogout = jest
  .fn()
  .mockImplementation(() => eventEmitter.emit(base_1.ADAPTER_EVENTS.DISCONNECTED))
const mockAddEventListener = jest
  .fn()
  .mockImplementation((event, listener) => eventEmitter.on(event, listener))
const mockRemoveEventListener = jest
  .fn()
  .mockImplementation((event, listener) => eventEmitter.off(event, listener))
jest.mock('@web3auth/modal', () => {
  return {
    Web3Auth: jest.fn().mockImplementation(() => {
      return {
        provider: mockProvider,
        initModal: mockInitModal,
        connect: mockConnect,
        configureAdapter: jest.fn(),
        logout: mockLogout,
        on: mockAddEventListener,
        off: mockRemoveEventListener
      }
    })
  }
})
jest.mock('@safe-global/api-kit', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getSafesByOwner: jest.fn().mockImplementation(() => {
        return Promise.resolve({ safes: ['0x123', '0x456'] })
      })
    }
  })
})
const config = {
  clientId: '123',
  web3AuthNetwork: 'testnet',
  chainConfig: {
    chainNamespace: base_1.CHAIN_NAMESPACES.EIP155,
    chainId: '0x5',
    rpcTarget: `https://goerli.infura.io/v3/api-key`
  }
}
describe('SafeAuthKit', () => {
  let web3AuthModalPack
  beforeEach(() => {
    web3AuthModalPack = new Web3AuthModalPack_1.Web3AuthModalPack(config)
  })
  it('should create a SafeAuthKit instance', async () => {
    const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
    expect(safeAuthKit).toBeInstanceOf(SafeAuthKit_1.SafeAuthKit)
    expect(
      safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.safeAuthData
    ).toBeUndefined()
  })
  it('should clean the auth data when signing out', async () => {
    const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
    testingUtils.lowLevel.mockRequest('eth_accounts', [
      '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    ])
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signIn())
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signOut())
    expect(
      safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.safeAuthData
    ).toBeUndefined()
  })
  it('should allow to get the provider', async () => {
    const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
    expect(
      safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.getProvider()
    ).toBe(mockProvider)
  })
  it('should allow to subscribe to events', async () => {
    const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
    const signedIn = jest.fn()
    const signedOut = jest.fn()
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.subscribe(base_1.ADAPTER_EVENTS.CONNECTED, signedIn)
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.subscribe(base_1.ADAPTER_EVENTS.DISCONNECTED, signedOut)
    testingUtils.lowLevel.mockRequest('eth_accounts', [
      '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    ])
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signIn())
    expect(signedIn).toHaveBeenCalled()
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signOut())
    expect(signedOut).toHaveBeenCalled()
  })
  it('should allow to unsubscribe to events', async () => {
    const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
    const signedIn = jest.fn()
    const signedOut = jest.fn()
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.subscribe(base_1.ADAPTER_EVENTS.CONNECTED, signedIn)
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.subscribe(base_1.ADAPTER_EVENTS.DISCONNECTED, signedOut)
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.unsubscribe(base_1.ADAPTER_EVENTS.CONNECTED, signedIn)
    safeAuthKit === null || safeAuthKit === void 0
      ? void 0
      : safeAuthKit.unsubscribe(base_1.ADAPTER_EVENTS.DISCONNECTED, signedOut)
    testingUtils.lowLevel.mockRequest('eth_accounts', [
      '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
    ])
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signIn())
    expect(signedIn).toHaveBeenCalledTimes(0)
    await (safeAuthKit === null || safeAuthKit === void 0 ? void 0 : safeAuthKit.signOut())
    expect(signedOut).toHaveBeenCalledTimes(0)
  })
  describe('using the Web3AuthModalPack', () => {
    const MockedWeb3Auth = jest.mocked(web3AuthModal.Web3Auth)
    beforeEach(() => {
      jest.clearAllMocks()
      testingUtils.clearAllMocks()
      mockInitModal.mockClear()
      mockConnect.mockClear()
    })
    it('should call the initModal method after create a Web3Auth instance', async () => {
      await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
      expect(MockedWeb3Auth).toHaveBeenCalledTimes(1)
      expect(mockInitModal).toHaveBeenCalledTimes(1)
      expect(MockedWeb3Auth).toHaveBeenCalledWith(expect.objectContaining(config))
    })
    it('should return the associated eoa when the user is signed in', async () => {
      const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack)
      testingUtils.lowLevel.mockRequest('eth_accounts', [
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
      ])
      const data = await (safeAuthKit === null || safeAuthKit === void 0
        ? void 0
        : safeAuthKit.signIn())
      expect(data).toEqual({
        eoa: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        safes: undefined
      })
    })
  })
  describe('when adding the txServiceUrl to the config', () => {
    it('should return the associated eoa and safes when the user is signed in', async () => {
      const safeAuthKit = await SafeAuthKit_1.SafeAuthKit.init(web3AuthModalPack, {
        txServiceUrl: 'https://safe-transaction.safe.global'
      })
      testingUtils.lowLevel.mockRequest('eth_accounts', [
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
      ])
      const data = await (safeAuthKit === null || safeAuthKit === void 0
        ? void 0
        : safeAuthKit.signIn())
      expect(data).toEqual({
        eoa: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        safes: ['0x123', '0x456']
      })
    })
  })
})
//# sourceMappingURL=SafeAuthKit.test.js.map
