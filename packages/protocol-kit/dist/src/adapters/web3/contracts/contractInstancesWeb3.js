'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getCreateCallContractInstance =
  exports.getSignMessageLibContractInstance =
  exports.getGnosisSafeProxyFactoryContractInstance =
  exports.getMultiSendCallOnlyContractInstance =
  exports.getMultiSendContractInstance =
  exports.getCompatibilityFallbackHandlerContractInstance =
  exports.getSafeContractInstance =
    void 0
const CompatibilityFallbackHandler_V1_3_0_Web3_1 = __importDefault(
  require('./CompatibilityFallbackHandler/v1.3.0/CompatibilityFallbackHandler_V1_3_0_Web3')
)
const CreateCallEthersContract_V1_3_0_Web3_1 = __importDefault(
  require('./CreateCall/v1.3.0/CreateCallEthersContract_V1_3_0_Web3')
)
const GnosisSafeContract_V1_0_0_Web3_1 = __importDefault(
  require('./GnosisSafe/v1.0.0/GnosisSafeContract_V1_0_0_Web3')
)
const GnosisSafeContract_V1_1_1_Web3_1 = __importDefault(
  require('./GnosisSafe/v1.1.1/GnosisSafeContract_V1_1_1_Web3')
)
const GnosisSafeContract_V1_2_0_Web3_1 = __importDefault(
  require('./GnosisSafe/v1.2.0/GnosisSafeContract_V1_2_0_Web3')
)
const GnosisSafeContract_V1_3_0_Web3_1 = __importDefault(
  require('./GnosisSafe/v1.3.0/GnosisSafeContract_V1_3_0_Web3')
)
const GnosisSafeProxyFactoryContract_V1_0_0_Web3_1 = __importDefault(
  require('./GnosisSafeProxyFactory/v1.0.0/GnosisSafeProxyFactoryContract_V1_0_0_Web3')
)
const GnosisSafeProxyFactoryContract_V1_1_1_Web3_1 = __importDefault(
  require('./GnosisSafeProxyFactory/v1.1.1/GnosisSafeProxyFactoryContract_V1_1_1_Web3')
)
const GnosisSafeProxyFactoryContract_V1_3_0_Web3_1 = __importDefault(
  require('./GnosisSafeProxyFactory/v1.3.0/GnosisSafeProxyFactoryContract_V1_3_0_Web3')
)
const MultiSendContract_V1_1_1_Web3_1 = __importDefault(
  require('./MultiSend/v1.1.1/MultiSendContract_V1_1_1_Web3')
)
const MultiSendContract_V1_3_0_Web3_1 = __importDefault(
  require('./MultiSend/v1.3.0/MultiSendContract_V1_3_0_Web3')
)
const MultiSendCallOnlyContract_V1_3_0_Web3_1 = __importDefault(
  require('./MultiSendCallOnly/v1.3.0/MultiSendCallOnlyContract_V1_3_0_Web3')
)
const SignMessageLibContract_V1_3_0_Web3_1 = __importDefault(
  require('./SignMessageLib/v1.3.0/SignMessageLibContract_V1_3_0_Web3')
)
function getSafeContractInstance(safeVersion, safeContract) {
  switch (safeVersion) {
    case '1.3.0':
      return new GnosisSafeContract_V1_3_0_Web3_1.default(safeContract)
    case '1.2.0':
      return new GnosisSafeContract_V1_2_0_Web3_1.default(safeContract)
    case '1.1.1':
      return new GnosisSafeContract_V1_1_1_Web3_1.default(safeContract)
    case '1.0.0':
      return new GnosisSafeContract_V1_0_0_Web3_1.default(safeContract)
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getSafeContractInstance = getSafeContractInstance
function getCompatibilityFallbackHandlerContractInstance(
  safeVersion,
  compatibilityFallbackhandlerContract
) {
  switch (safeVersion) {
    case '1.3.0':
    case '1.2.0':
    case '1.1.1':
      return new CompatibilityFallbackHandler_V1_3_0_Web3_1.default(
        compatibilityFallbackhandlerContract
      )
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getCompatibilityFallbackHandlerContractInstance =
  getCompatibilityFallbackHandlerContractInstance
function getMultiSendContractInstance(safeVersion, multiSendContract) {
  switch (safeVersion) {
    case '1.3.0':
      return new MultiSendContract_V1_3_0_Web3_1.default(multiSendContract)
    case '1.2.0':
    case '1.1.1':
    case '1.0.0':
      return new MultiSendContract_V1_1_1_Web3_1.default(multiSendContract)
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getMultiSendContractInstance = getMultiSendContractInstance
function getMultiSendCallOnlyContractInstance(safeVersion, multiSendCallOnlyContract) {
  switch (safeVersion) {
    case '1.3.0':
    case '1.2.0':
    case '1.1.1':
    case '1.0.0':
      return new MultiSendCallOnlyContract_V1_3_0_Web3_1.default(multiSendCallOnlyContract)
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getMultiSendCallOnlyContractInstance = getMultiSendCallOnlyContractInstance
function getGnosisSafeProxyFactoryContractInstance(safeVersion, gnosisSafeProxyFactoryContract) {
  switch (safeVersion) {
    case '1.3.0':
      return new GnosisSafeProxyFactoryContract_V1_3_0_Web3_1.default(
        gnosisSafeProxyFactoryContract
      )
    case '1.2.0':
    case '1.1.1':
      return new GnosisSafeProxyFactoryContract_V1_1_1_Web3_1.default(
        gnosisSafeProxyFactoryContract
      )
    case '1.0.0':
      return new GnosisSafeProxyFactoryContract_V1_0_0_Web3_1.default(
        gnosisSafeProxyFactoryContract
      )
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getGnosisSafeProxyFactoryContractInstance = getGnosisSafeProxyFactoryContractInstance
function getSignMessageLibContractInstance(safeVersion, signMessageLibContract) {
  switch (safeVersion) {
    case '1.3.0':
      return new SignMessageLibContract_V1_3_0_Web3_1.default(signMessageLibContract)
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getSignMessageLibContractInstance = getSignMessageLibContractInstance
function getCreateCallContractInstance(safeVersion, createCallContract) {
  switch (safeVersion) {
    case '1.3.0':
    case '1.2.0':
    case '1.1.1':
    case '1.0.0':
      return new CreateCallEthersContract_V1_3_0_Web3_1.default(createCallContract)
    default:
      throw new Error('Invalid Safe version')
  }
}
exports.getCreateCallContractInstance = getCreateCallContractInstance
//# sourceMappingURL=contractInstancesWeb3.js.map
