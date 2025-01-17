'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const bignumber_1 = require('@ethersproject/bignumber')
const protocol_kit_1 = __importDefault(require('@safe-global/protocol-kit'))
const safe_core_sdk_types_1 = require('@safe-global/safe-core-sdk-types')
const constants_1 = require('../../constants')
const GelatoRelayPack_1 = require('./GelatoRelayPack')
var TaskState
;(function (TaskState) {
  TaskState['CheckPending'] = 'CheckPending'
})(TaskState || (TaskState = {}))
const CHAIN_ID = 1
const ADDRESS = '0x...address'
const SAFE_ADDRESS = '0x...safe-address'
const API_KEY = 'api-key'
const FEE_ESTIMATION = bignumber_1.BigNumber.from(100000)
const TASK_ID = 'task-id'
const TASK_STATUS = {
  chainId: CHAIN_ID,
  taskState: TaskState.CheckPending,
  taskId: TASK_ID,
  creationDate: Date.now().toString()
}
const RELAY_RESPONSE = {
  taskId: TASK_ID
}
const SAFE_TRANSACTION = {
  data: {
    operation: safe_core_sdk_types_1.OperationType.Call,
    safeTxGas: '0',
    baseGas: '0',
    gasPrice: '0',
    nonce: 0,
    gasToken: '0x',
    refundReceiver: '0x',
    to: ADDRESS,
    value: '0',
    data: '0x'
  }
}
const mockGetEstimateFee = jest.fn().mockResolvedValue(FEE_ESTIMATION)
const mockGetTaskStatus = jest.fn().mockResolvedValue(TASK_STATUS)
const mockSponsoredCall = jest.fn().mockResolvedValue(RELAY_RESPONSE)
const mockCallWithSyncFee = jest.fn().mockResolvedValue(RELAY_RESPONSE)
jest.mock('@gelatonetwork/relay-sdk', () => {
  return {
    GelatoRelay: jest.fn().mockImplementation(() => {
      return {
        getEstimatedFee: mockGetEstimateFee,
        getTaskStatus: mockGetTaskStatus,
        sponsoredCall: mockSponsoredCall,
        callWithSyncFee: mockCallWithSyncFee
      }
    })
  }
})
jest.mock('@safe-global/protocol-kit')
const gelatoRelayPack = new GelatoRelayPack_1.GelatoRelayPack(API_KEY)
describe('GelatoRelayPack', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should allow to get a fee estimation', async () => {
    const chainId = 1
    const gasLimit = '100000'
    const gasToken = '0x0000000000000000000000000000000000000000'
    const estimation = await gelatoRelayPack.getEstimateFee(chainId, gasLimit, gasToken)
    expect(estimation).toBe(FEE_ESTIMATION.toString())
    expect(mockGetEstimateFee).toHaveBeenCalledWith(
      chainId,
      constants_1.GELATO_NATIVE_TOKEN_ADDRESS,
      bignumber_1.BigNumber.from(gasLimit),
      true
    )
    expect(bignumber_1.BigNumber.from(estimation).gt(bignumber_1.BigNumber.from(0))).toBe(true)
  })
  it('should allow to check the task status', async () => {
    const taskId = 'task-id'
    const status = await gelatoRelayPack.getTaskStatus(taskId)
    expect(status).toBe(TASK_STATUS)
    expect(mockGetTaskStatus).toHaveBeenCalledWith('task-id')
  })
  it('should allow to make a sponsored transaction', async () => {
    const response = await gelatoRelayPack.sendSponsorTransaction(SAFE_ADDRESS, '0x', CHAIN_ID)
    expect(response).toBe(RELAY_RESPONSE)
    expect(mockSponsoredCall).toHaveBeenCalledWith(
      {
        chainId: CHAIN_ID,
        target: SAFE_ADDRESS,
        data: '0x'
      },
      API_KEY
    )
  })
  it('should throw an error when trying to do a sponsored transaction without an api key', async () => {
    const relayPack = new GelatoRelayPack_1.GelatoRelayPack()
    await expect(
      relayPack.sendSponsorTransaction(SAFE_ADDRESS, '0x', CHAIN_ID)
    ).rejects.toThrowError('API key not defined')
  })
  describe('when creating a relayed transaction', () => {
    let relayPack
    const safe = new protocol_kit_1.default()
    const args = [
      safe,
      {
        to: ADDRESS,
        data: '0x',
        value: '0'
      },
      {
        gasLimit: bignumber_1.BigNumber.from(100),
        isSponsored: true
      }
    ]
    beforeEach(() => {
      jest.clearAllMocks()
      relayPack = new GelatoRelayPack_1.GelatoRelayPack()
      safe.getNonce = jest.fn().mockResolvedValue(0)
      safe.getContractManager = jest.fn().mockReturnValue({ safeContract: {} })
      safe.createTransaction = jest.fn().mockResolvedValue(SAFE_TRANSACTION)
    })
    it('should allow you to create a sponsored one', async () => {
      await relayPack.createRelayedTransaction(args[0], args[1], args[2])
      expect(safe.createTransaction).toHaveBeenCalledWith({
        safeTransactionData: args[1],
        options: expect.objectContaining({
          nonce: 0
        })
      })
    })
    it('should allow to create a sync fee one', async () => {
      await relayPack.createRelayedTransaction(args[0], args[1], {
        ...args[2],
        isSponsored: false
      })
      expect(safe.createTransaction).toHaveBeenCalledWith({
        safeTransactionData: args[1],
        options: expect.objectContaining({
          baseGas: '100000',
          gasPrice: '1',
          refundReceiver: constants_1.GELATO_FEE_COLLECTOR
        })
      })
    })
    it('should return the correct gasToken when being sent through the options', async () => {
      const GAS_TOKEN = '0x...gasToken'
      await relayPack.createRelayedTransaction(args[0], args[1], {
        ...args[2],
        isSponsored: false,
        gasToken: GAS_TOKEN
      })
      expect(safe.createTransaction).toHaveBeenCalledWith({
        safeTransactionData: args[1],
        options: expect.objectContaining({
          baseGas: '100000',
          gasPrice: '1',
          gasToken: GAS_TOKEN,
          refundReceiver: constants_1.GELATO_FEE_COLLECTOR
        })
      })
    })
  })
  it('should allow to make a sync fee transaction', async () => {
    const response = await gelatoRelayPack.sendSyncTransaction(SAFE_ADDRESS, '0x', CHAIN_ID, {
      gasLimit: '100000'
    })
    expect(response).toBe(RELAY_RESPONSE)
    expect(mockCallWithSyncFee).toHaveBeenCalledWith(
      {
        chainId: CHAIN_ID,
        target: SAFE_ADDRESS,
        data: '0x',
        feeToken: constants_1.GELATO_NATIVE_TOKEN_ADDRESS,
        isRelayContext: false
      },
      {
        gasLimit: '100000'
      }
    )
  })
  it('should expose a relayTransaction doing a sponsored or sync fee transaction depending on an optional parameter', async () => {
    const sponsoredResponse = await gelatoRelayPack.relayTransaction({
      target: SAFE_ADDRESS,
      encodedTransaction: '0x',
      chainId: CHAIN_ID,
      options: {
        gasLimit: '100000',
        isSponsored: true
      }
    })
    expect(sponsoredResponse).toBe(RELAY_RESPONSE)
    expect(mockSponsoredCall).toHaveBeenCalledWith(
      {
        chainId: CHAIN_ID,
        target: SAFE_ADDRESS,
        data: '0x'
      },
      API_KEY
    )
    const paidResponse = await gelatoRelayPack.relayTransaction({
      target: SAFE_ADDRESS,
      encodedTransaction: '0x',
      chainId: CHAIN_ID,
      options: {
        gasLimit: '100000',
        isSponsored: false
      }
    })
    expect(paidResponse).toBe(RELAY_RESPONSE)
    expect(mockCallWithSyncFee).toHaveBeenCalledWith(
      {
        chainId: CHAIN_ID,
        target: SAFE_ADDRESS,
        data: '0x',
        feeToken: constants_1.GELATO_NATIVE_TOKEN_ADDRESS,
        isRelayContext: false
      },
      {
        gasLimit: '100000'
      }
    )
  })
  it('should allow to retrieve the fee collector address', () => {
    expect(gelatoRelayPack.getFeeCollector()).toBe(constants_1.GELATO_FEE_COLLECTOR)
  })
})
//# sourceMappingURL=GelatoRelayPack.test.js.map
