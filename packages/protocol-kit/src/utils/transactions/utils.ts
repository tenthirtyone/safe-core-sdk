import { Interface } from '@ethersproject/abi'
import { arrayify } from '@ethersproject/bytes'
import { pack as solidityPack } from '@ethersproject/solidity'
import { StandardizeSafeTransactionDataProps } from '@safe-global/protocol-kit/types'
import { hasSafeFeature, SAFE_FEATURES } from '@safe-global/protocol-kit/utils'
import { ZERO_ADDRESS } from '@safe-global/protocol-kit/utils/constants'
import { SAFE_LAST_VERSION } from '@safe-global/protocol-kit/contracts/config'
import {
  MetaTransactionData,
  OperationType,
  SafeMultisigTransactionResponse,
  SafeTransaction,
  SafeTransactionData,
  SafeTransactionDataPartial,
  SafeVersion
} from '@safe-global/safe-core-sdk-types'
import { hexToNumber, hexToNumberString, toChecksumAddress } from 'web3-utils'
import { estimateTxGas } from './gas'

export function standardizeMetaTransactionData(
  tx: SafeTransactionDataPartial
): MetaTransactionData {
  const standardizedTxs: MetaTransactionData = {
    ...tx,
    operation: tx.operation ?? OperationType.Call
  }
  return standardizedTxs
}

export async function standardizeSafeTransactionData({
  safeContract,
  predictedSafe,
  ethAdapter,
  tx
}: StandardizeSafeTransactionDataProps): Promise<SafeTransactionData> {
  const standardizedTxs = {
    to: tx.to,
    value: tx.value,
    data: tx.data,
    operation: tx.operation ?? OperationType.Call,
    baseGas: tx.baseGas ?? '0',
    gasPrice: tx.gasPrice ?? '0',
    gasToken: tx.gasToken || ZERO_ADDRESS,
    refundReceiver: tx.refundReceiver || ZERO_ADDRESS,
    nonce: tx.nonce ?? (safeContract ? await safeContract.getNonce() : 0)
  }

  if (typeof tx.safeTxGas !== 'undefined') {
    return {
      ...standardizedTxs,
      safeTxGas: tx.safeTxGas
    }
  }

  let safeVersion: SafeVersion
  if (predictedSafe) {
    safeVersion = predictedSafe?.safeDeploymentConfig?.safeVersion || SAFE_LAST_VERSION
  } else {
    if (!safeContract) {
      throw new Error('Safe is not deployed')
    }
    safeVersion = await safeContract.getVersion()
  }

  const hasSafeTxGasOptional = hasSafeFeature(SAFE_FEATURES.SAFE_TX_GAS_OPTIONAL, safeVersion)
  if (
    (hasSafeTxGasOptional && standardizedTxs.gasPrice === '0') ||
    (hasSafeTxGasOptional && predictedSafe)
  ) {
    return {
      ...standardizedTxs,
      safeTxGas: '0'
    }
  }

  if (!safeContract) {
    throw new Error('Safe is not deployed')
  }
  const safeTxGas = await estimateTxGas(
    safeContract,
    ethAdapter,
    standardizedTxs.to,
    standardizedTxs.value,
    standardizedTxs.data,
    standardizedTxs.operation
  )
  return {
    ...standardizedTxs,
    safeTxGas
  }
}

function encodeMetaTransaction(tx: MetaTransactionData): string {
  const data = arrayify(tx.data)
  const encoded = solidityPack(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [tx.operation, tx.to, tx.value, data.length, data]
  )
  return encoded.slice(2)
}

export function encodeMultiSendData(txs: MetaTransactionData[]): string {
  return '0x' + txs.map((tx) => encodeMetaTransaction(tx)).join('')
}

export function decodeMultiSendData(encodedData: string): MetaTransactionData[] {
  const multiSendInterface = new Interface([
    'function multiSend(bytes memory transactions) public payable'
  ])
  const [decodedData] = multiSendInterface.decodeFunctionData('multiSend', encodedData)

  const txs: MetaTransactionData[] = []

  // Decode after 0x
  let index = 2

  while (index < decodedData.length) {
    // As we are decoding hex encoded bytes calldata, each byte is represented by 2 chars
    // uint8 operation, address to, value uint256, dataLength uint256

    const operation = `0x${decodedData.slice(index, (index += 2))}`
    const to = `0x${decodedData.slice(index, (index += 40))}`
    const value = `0x${decodedData.slice(index, (index += 64))}`
    const dataLength = parseInt(decodedData.slice(index, (index += 64)), 16) * 2
    const data = `0x${decodedData.slice(index, (index += dataLength))}`

    txs.push({
      operation: hexToNumber(operation) as OperationType,
      to: toChecksumAddress(to),
      value: hexToNumberString(value),
      data
    })
  }

  return txs
}

export function isMetaTransactionArray(
  safeTransactions: SafeTransactionDataPartial | MetaTransactionData[]
): safeTransactions is MetaTransactionData[] {
  return (safeTransactions as MetaTransactionData[])?.length !== undefined
}

export function isSafeMultisigTransactionResponse(
  safeTransaction: SafeTransaction | SafeMultisigTransactionResponse
): safeTransaction is SafeMultisigTransactionResponse {
  return (safeTransaction as SafeMultisigTransactionResponse).isExecuted !== undefined
}
