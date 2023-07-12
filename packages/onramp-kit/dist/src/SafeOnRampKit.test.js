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
Object.defineProperty(exports, '__esModule', { value: true })
const SafeOnRampKit_1 = require('./SafeOnRampKit')
const stripePack = __importStar(require('./packs/stripe/StripePack'))
const openOptions = {
  element: '#root',
  defaultOptions: {
    transaction_details: {
      wallet_address: '0x',
      supported_destination_networks: ['ethereum']
    }
  }
}
const config = {
  stripePublicKey: 'stripe-public-key',
  onRampBackendUrl: 'onramp-backend-url'
}
jest.mock('./packs/stripe/StripePack')
describe('SafeOnRampKit', () => {
  let pack
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
    pack = new stripePack.StripePack(config)
  })
  it('should create a SafeOnRampKit instance when using the init() method', async () => {
    const safeOnRampKit = await SafeOnRampKit_1.SafeOnRampKit.init(pack)
    expect(safeOnRampKit).toBeInstanceOf(SafeOnRampKit_1.SafeOnRampKit)
  })
  it('should create a XXXPack instance using the provider config and call the init() method in the instance', async () => {
    await SafeOnRampKit_1.SafeOnRampKit.init(pack)
    expect(stripePack.StripePack).toHaveBeenCalledWith(expect.objectContaining(config))
    expect(stripePack.StripePack.prototype.init).toHaveBeenCalled()
  })
  it('should call the open method in the XXXPack with the corresponding options', async () => {
    const safeOnRampKit = await SafeOnRampKit_1.SafeOnRampKit.init(pack)
    safeOnRampKit.open(openOptions)
    expect(stripePack.StripePack.prototype.open).toHaveBeenCalledWith(
      expect.objectContaining(openOptions)
    )
  })
  it('should call the close method in the XXXPack', async () => {
    const safeOnRampKit = await SafeOnRampKit_1.SafeOnRampKit.init(pack)
    safeOnRampKit.close()
    expect(stripePack.StripePack.prototype.close).toHaveBeenCalled()
  })
})
//# sourceMappingURL=SafeOnRampKit.test.js.map
