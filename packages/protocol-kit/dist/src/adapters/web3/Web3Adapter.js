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
var _Web3Adapter_web3, _Web3Adapter_signerAddress
Object.defineProperty(exports, '__esModule', { value: true })
const bignumber_1 = require('@ethersproject/bignumber')
const utils_1 = require('../../utils')
const contractInstancesWeb3_1 = require('./contracts/contractInstancesWeb3')
class Web3Adapter {
  constructor({ web3, signerAddress }) {
    _Web3Adapter_web3.set(this, void 0)
    _Web3Adapter_signerAddress.set(this, void 0)
    if (!web3) {
      throw new Error('web3 property missing from options')
    }
    __classPrivateFieldSet(this, _Web3Adapter_web3, web3, 'f')
    __classPrivateFieldSet(this, _Web3Adapter_signerAddress, signerAddress, 'f')
  }
  isAddress(address) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').utils.isAddress(address)
  }
  async getEip3770Address(fullAddress) {
    const chainId = await this.getChainId()
    return (0, utils_1.validateEip3770Address)(fullAddress, chainId)
  }
  async getBalance(address, defaultBlock) {
    const balance = defaultBlock
      ? await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getBalance(
          address,
          defaultBlock
        )
      : await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getBalance(address)
    // FIXME Web3 Adapter is forced to return an Ethers type
    return bignumber_1.BigNumber.from(balance)
  }
  async getNonce(address, defaultBlock) {
    const nonce = defaultBlock
      ? await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getTransactionCount(
          address,
          defaultBlock
        )
      : await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getTransactionCount(address)
    return nonce
  }
  async getChainId() {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getChainId()
  }
  getChecksummedAddress(address) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').utils.toChecksumAddress(address)
  }
  async getSafeContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid SafeProxy contract address')
    }
    const safeContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getSafeContractInstance)(safeVersion, safeContract)
  }
  async getSafeProxyFactoryContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid SafeProxyFactory contract address')
    }
    const proxyFactoryContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getGnosisSafeProxyFactoryContractInstance)(
      safeVersion,
      proxyFactoryContract
    )
  }
  async getMultiSendContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid MultiSend contract address')
    }
    const multiSendContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getMultiSendContractInstance)(safeVersion, multiSendContract)
  }
  async getMultiSendCallOnlyContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid MultiSendCallOnly contract address')
    }
    const multiSendContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getMultiSendCallOnlyContractInstance)(
      safeVersion,
      multiSendContract
    )
  }
  async getCompatibilityFallbackHandlerContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid Compatibility Fallback Handler contract address')
    }
    const multiSendContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getCompatibilityFallbackHandlerContractInstance)(
      safeVersion,
      multiSendContract
    )
  }
  async getSignMessageLibContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid SignMessageLib contract address')
    }
    const signMessageLibContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getSignMessageLibContractInstance)(
      safeVersion,
      signMessageLibContract
    )
  }
  async getCreateCallContract({
    safeVersion,
    singletonDeployment,
    customContractAddress,
    customContractAbi
  }) {
    const chainId = await this.getChainId()
    const contractAddress =
      customContractAddress !== null && customContractAddress !== void 0
        ? customContractAddress
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.networkAddresses[chainId]
    if (!contractAddress) {
      throw new Error('Invalid CreateCall contract address')
    }
    const createCallContract = this.getContract(
      contractAddress,
      customContractAbi !== null && customContractAbi !== void 0
        ? customContractAbi
        : singletonDeployment === null || singletonDeployment === void 0
        ? void 0
        : singletonDeployment.abi
    )
    return (0, contractInstancesWeb3_1.getCreateCallContractInstance)(
      safeVersion,
      createCallContract
    )
  }
  getContract(address, abi, options) {
    return new (__classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.Contract)(
      abi,
      address,
      options
    )
  }
  async getContractCode(address, defaultBlock) {
    const code = defaultBlock
      ? await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getCode(
          address,
          defaultBlock
        )
      : await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getCode(address)
    return code
  }
  async isContractDeployed(address, defaultBlock) {
    const contractCode = await this.getContractCode(address, defaultBlock)
    return contractCode !== '0x'
  }
  async getStorageAt(address, position) {
    const content = await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getStorageAt(
      address,
      position
    )
    const decodedContent = this.decodeParameters(['address'], content)
    return decodedContent[0]
  }
  async getTransaction(transactionHash) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.getTransaction(transactionHash)
  }
  async getSignerAddress() {
    return __classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f')
  }
  signMessage(message) {
    if (!__classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f')) {
      throw new Error('EthAdapter must be initialized with a signer to use this method')
    }
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.sign(
      message,
      __classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f')
    )
  }
  async signTypedData(safeTransactionEIP712Args, methodVersion) {
    if (!__classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f')) {
      throw new Error('This method requires a signer')
    }
    const typedData = (0, utils_1.generateTypedData)(safeTransactionEIP712Args)
    let method = 'eth_signTypedData_v3'
    if (methodVersion === 'v4') {
      method = 'eth_signTypedData_v4'
    } else if (!methodVersion) {
      method = 'eth_signTypedData'
    }
    const jsonTypedData = JSON.stringify(typedData)
    const signedTypedData = {
      jsonrpc: '2.0',
      method,
      params:
        methodVersion === 'v3' || methodVersion === 'v4'
          ? [__classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f'), jsonTypedData]
          : [jsonTypedData, __classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f')],
      from: __classPrivateFieldGet(this, _Web3Adapter_signerAddress, 'f'),
      id: new Date().getTime()
    }
    return new Promise((resolve, reject) => {
      const provider = __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').currentProvider
      function callback(err, val) {
        if (err) {
          reject(err)
          return
        }
        if ((val === null || val === void 0 ? void 0 : val.result) == null) {
          reject(new Error("EIP-712 is not supported by user's wallet"))
          return
        }
        resolve(val.result)
      }
      provider.send(signedTypedData, callback)
    })
  }
  async estimateGas(transaction, callback) {
    return (
      await __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.estimateGas(
        transaction,
        callback
      )
    ).toString()
  }
  call(transaction, defaultBlock) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.call(transaction, defaultBlock)
  }
  encodeParameters(types, values) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.abi.encodeParameters(
      types,
      values
    )
  }
  decodeParameters(types, values) {
    return __classPrivateFieldGet(this, _Web3Adapter_web3, 'f').eth.abi.decodeParameters(
      types,
      values
    )
  }
}
;(_Web3Adapter_web3 = new WeakMap()), (_Web3Adapter_signerAddress = new WeakMap())
exports.default = Web3Adapter
//# sourceMappingURL=Web3Adapter.js.map
