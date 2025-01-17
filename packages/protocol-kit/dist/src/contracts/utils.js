'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.validateSafeDeploymentConfig =
  exports.validateSafeAccountConfig =
  exports.predictSafeAddress =
  exports.encodeSetupCallData =
  exports.encodeCreateProxyWithNonce =
  exports.PREDETERMINED_SALT_NONCE =
    void 0
const ethereumjs_util_1 = require('ethereumjs-util')
const address_1 = require('@ethersproject/address')
const bignumber_1 = require('@ethersproject/bignumber')
const satisfies_1 = __importDefault(require('semver/functions/satisfies'))
const safeDeploymentContracts_1 = require('../contracts/safeDeploymentContracts')
const constants_1 = require('../utils/constants')
const config_1 = require('../contracts/config')
// keccak256(toUtf8Bytes('Safe Account Abstraction'))
exports.PREDETERMINED_SALT_NONCE =
  '0xb1073742015cbcf5a3a4d9d1ae33ecf619439710b89475f92e2abd2117e90f90'
function encodeCreateProxyWithNonce(safeProxyFactoryContract, safeSingletonAddress, initializer) {
  return safeProxyFactoryContract.encode('createProxyWithNonce', [
    safeSingletonAddress,
    initializer,
    exports.PREDETERMINED_SALT_NONCE
  ])
}
exports.encodeCreateProxyWithNonce = encodeCreateProxyWithNonce
async function encodeSetupCallData({
  ethAdapter,
  safeAccountConfig,
  safeContract,
  customContracts
}) {
  const {
    owners,
    threshold,
    to = constants_1.ZERO_ADDRESS,
    data = constants_1.EMPTY_DATA,
    fallbackHandler,
    paymentToken = constants_1.ZERO_ADDRESS,
    payment = 0,
    paymentReceiver = constants_1.ZERO_ADDRESS
  } = safeAccountConfig
  const safeVersion = await safeContract.getVersion()
  if ((0, satisfies_1.default)(safeVersion, '<=1.0.0')) {
    return safeContract.encode('setup', [
      owners,
      threshold,
      to,
      data,
      paymentToken,
      payment,
      paymentReceiver
    ])
  }
  let fallbackHandlerAddress = fallbackHandler
  const isValidAddress =
    fallbackHandlerAddress !== undefined && (0, address_1.isAddress)(fallbackHandlerAddress)
  if (!isValidAddress) {
    const fallbackHandlerContract = await (0,
    safeDeploymentContracts_1.getCompatibilityFallbackHandlerContract)({
      ethAdapter,
      safeVersion,
      customContracts
    })
    fallbackHandlerAddress = fallbackHandlerContract.getAddress()
  }
  return safeContract.encode('setup', [
    owners,
    threshold,
    to,
    data,
    fallbackHandlerAddress,
    paymentToken,
    payment,
    paymentReceiver
  ])
}
exports.encodeSetupCallData = encodeSetupCallData
async function predictSafeAddress({
  ethAdapter,
  safeAccountConfig,
  safeDeploymentConfig = {},
  isL1SafeMasterCopy = false,
  customContracts
}) {
  ;(0, exports.validateSafeAccountConfig)(safeAccountConfig)
  ;(0, exports.validateSafeDeploymentConfig)(safeDeploymentConfig)
  const { safeVersion = config_1.SAFE_LAST_VERSION, saltNonce = exports.PREDETERMINED_SALT_NONCE } =
    safeDeploymentConfig
  const safeProxyFactoryContract = await (0, safeDeploymentContracts_1.getProxyFactoryContract)({
    ethAdapter,
    safeVersion,
    customContracts
  })
  const proxyCreationCode = await safeProxyFactoryContract.proxyCreationCode()
  const safeContract = await (0, safeDeploymentContracts_1.getSafeContract)({
    ethAdapter,
    safeVersion,
    isL1SafeMasterCopy,
    customContracts
  })
  const initializer = await encodeSetupCallData({
    ethAdapter,
    safeAccountConfig,
    safeContract,
    customContracts
  })
  const encodedNonce = (0, ethereumjs_util_1.toBuffer)(
    ethAdapter.encodeParameters(['uint256'], [saltNonce])
  ).toString('hex')
  const salt = (0, ethereumjs_util_1.keccak256)(
    (0, ethereumjs_util_1.toBuffer)(
      '0x' +
        (0, ethereumjs_util_1.keccak256)((0, ethereumjs_util_1.toBuffer)(initializer)).toString(
          'hex'
        ) +
        encodedNonce
    )
  )
  const constructorData = (0, ethereumjs_util_1.toBuffer)(
    ethAdapter.encodeParameters(['address'], [safeContract.getAddress()])
  ).toString('hex')
  const initCode = proxyCreationCode + constructorData
  const proxyAddress =
    '0x' +
    (0, ethereumjs_util_1.generateAddress2)(
      (0, ethereumjs_util_1.toBuffer)(safeProxyFactoryContract.getAddress()),
      (0, ethereumjs_util_1.toBuffer)(salt),
      (0, ethereumjs_util_1.toBuffer)(initCode)
    ).toString('hex')
  return ethAdapter.getChecksummedAddress(proxyAddress)
}
exports.predictSafeAddress = predictSafeAddress
const validateSafeAccountConfig = ({ owners, threshold }) => {
  if (owners.length <= 0) throw new Error('Owner list must have at least one owner')
  if (threshold <= 0) throw new Error('Threshold must be greater than or equal to 1')
  if (threshold > owners.length)
    throw new Error('Threshold must be lower than or equal to owners length')
}
exports.validateSafeAccountConfig = validateSafeAccountConfig
const validateSafeDeploymentConfig = ({ saltNonce }) => {
  if (saltNonce && bignumber_1.BigNumber.from(saltNonce).lt(0))
    throw new Error('saltNonce must be greater than or equal to 0')
}
exports.validateSafeDeploymentConfig = validateSafeDeploymentConfig
//# sourceMappingURL=utils.js.map
