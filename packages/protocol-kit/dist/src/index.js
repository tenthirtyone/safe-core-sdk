'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.EthSafeSignature =
  exports.encodeCreateProxyWithNonce =
  exports.PREDETERMINED_SALT_NONCE =
  exports.encodeSetupCallData =
  exports.predictSafeAddress =
  exports.getCreateCallContract =
  exports.getSignMessageLibContract =
  exports.getMultiSendCallOnlyContract =
  exports.getMultiSendContract =
  exports.getCompatibilityFallbackHandlerContract =
  exports.getProxyFactoryContract =
  exports.getSafeContract =
  exports.SignMessageLibWeb3Contract =
  exports.MultiSendCallOnlyWeb3Contract =
  exports.MultiSendWeb3Contract =
  exports.GnosisSafeProxyFactoryWeb3Contract =
  exports.GnosisSafeContractWeb3 =
  exports.CreateCallWeb3Contract =
  exports.Web3Adapter =
  exports.SignMessageLibEthersContract =
  exports.MultiSendCallOnlyEthersContract =
  exports.MultiSendEthersContract =
  exports.GnosisSafeProxyFactoryEthersContract =
  exports.GnosisSafeContractEthers =
  exports.CreateCallEthersContract =
  exports.EthersAdapter =
  exports.standardizeSafeTransactionData =
  exports.encodeMultiSendData =
  exports.SafeFactory =
  exports.ContractManager =
    void 0
const ethers_1 = require('./adapters/ethers')
Object.defineProperty(exports, 'CreateCallEthersContract', {
  enumerable: true,
  get: function () {
    return ethers_1.CreateCallEthersContract
  }
})
Object.defineProperty(exports, 'EthersAdapter', {
  enumerable: true,
  get: function () {
    return ethers_1.EthersAdapter
  }
})
Object.defineProperty(exports, 'GnosisSafeContractEthers', {
  enumerable: true,
  get: function () {
    return ethers_1.GnosisSafeContractEthers
  }
})
Object.defineProperty(exports, 'GnosisSafeProxyFactoryEthersContract', {
  enumerable: true,
  get: function () {
    return ethers_1.GnosisSafeProxyFactoryEthersContract
  }
})
Object.defineProperty(exports, 'MultiSendCallOnlyEthersContract', {
  enumerable: true,
  get: function () {
    return ethers_1.MultiSendCallOnlyEthersContract
  }
})
Object.defineProperty(exports, 'MultiSendEthersContract', {
  enumerable: true,
  get: function () {
    return ethers_1.MultiSendEthersContract
  }
})
Object.defineProperty(exports, 'SignMessageLibEthersContract', {
  enumerable: true,
  get: function () {
    return ethers_1.SignMessageLibEthersContract
  }
})
const web3_1 = require('./adapters/web3')
Object.defineProperty(exports, 'CreateCallWeb3Contract', {
  enumerable: true,
  get: function () {
    return web3_1.CreateCallWeb3Contract
  }
})
Object.defineProperty(exports, 'GnosisSafeContractWeb3', {
  enumerable: true,
  get: function () {
    return web3_1.GnosisSafeContractWeb3
  }
})
Object.defineProperty(exports, 'GnosisSafeProxyFactoryWeb3Contract', {
  enumerable: true,
  get: function () {
    return web3_1.GnosisSafeProxyFactoryWeb3Contract
  }
})
Object.defineProperty(exports, 'MultiSendCallOnlyWeb3Contract', {
  enumerable: true,
  get: function () {
    return web3_1.MultiSendCallOnlyWeb3Contract
  }
})
Object.defineProperty(exports, 'MultiSendWeb3Contract', {
  enumerable: true,
  get: function () {
    return web3_1.MultiSendWeb3Contract
  }
})
Object.defineProperty(exports, 'SignMessageLibWeb3Contract', {
  enumerable: true,
  get: function () {
    return web3_1.SignMessageLibWeb3Contract
  }
})
Object.defineProperty(exports, 'Web3Adapter', {
  enumerable: true,
  get: function () {
    return web3_1.Web3Adapter
  }
})
const safeDeploymentContracts_1 = require('./contracts/safeDeploymentContracts')
Object.defineProperty(exports, 'getCompatibilityFallbackHandlerContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getCompatibilityFallbackHandlerContract
  }
})
Object.defineProperty(exports, 'getCreateCallContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getCreateCallContract
  }
})
Object.defineProperty(exports, 'getMultiSendCallOnlyContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getMultiSendCallOnlyContract
  }
})
Object.defineProperty(exports, 'getMultiSendContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getMultiSendContract
  }
})
Object.defineProperty(exports, 'getProxyFactoryContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getProxyFactoryContract
  }
})
Object.defineProperty(exports, 'getSafeContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSafeContract
  }
})
Object.defineProperty(exports, 'getSignMessageLibContract', {
  enumerable: true,
  get: function () {
    return safeDeploymentContracts_1.getSignMessageLibContract
  }
})
const utils_1 = require('./contracts/utils')
Object.defineProperty(exports, 'predictSafeAddress', {
  enumerable: true,
  get: function () {
    return utils_1.predictSafeAddress
  }
})
Object.defineProperty(exports, 'encodeSetupCallData', {
  enumerable: true,
  get: function () {
    return utils_1.encodeSetupCallData
  }
})
Object.defineProperty(exports, 'encodeCreateProxyWithNonce', {
  enumerable: true,
  get: function () {
    return utils_1.encodeCreateProxyWithNonce
  }
})
Object.defineProperty(exports, 'PREDETERMINED_SALT_NONCE', {
  enumerable: true,
  get: function () {
    return utils_1.PREDETERMINED_SALT_NONCE
  }
})
const contractManager_1 = __importDefault(require('./managers/contractManager'))
exports.ContractManager = contractManager_1.default
const Safe_1 = __importDefault(require('./Safe'))
const safeFactory_1 = __importDefault(require('./safeFactory'))
exports.SafeFactory = safeFactory_1.default
const utils_2 = require('./utils')
Object.defineProperty(exports, 'EthSafeSignature', {
  enumerable: true,
  get: function () {
    return utils_2.EthSafeSignature
  }
})
const utils_3 = require('./utils/transactions/utils')
Object.defineProperty(exports, 'encodeMultiSendData', {
  enumerable: true,
  get: function () {
    return utils_3.encodeMultiSendData
  }
})
Object.defineProperty(exports, 'standardizeSafeTransactionData', {
  enumerable: true,
  get: function () {
    return utils_3.standardizeSafeTransactionData
  }
})
exports.default = Safe_1.default
//# sourceMappingURL=index.js.map
