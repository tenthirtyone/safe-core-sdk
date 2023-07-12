import { RelayResponse, TransactionStatusResponse } from '@gelatonetwork/relay-sdk'
import Safe from '@safe-global/protocol-kit'
import { RelayPack } from '../../types'
import {
  MetaTransactionData,
  MetaTransactionOptions,
  RelayTransaction,
  SafeTransaction
} from '@safe-global/safe-core-sdk-types'
export declare class GelatoRelayPack implements RelayPack {
  #private
  constructor(apiKey?: string)
  private _getFeeToken
  getFeeCollector(): string
  getEstimateFee(chainId: number, gasLimit: string, gasToken?: string): Promise<string>
  getTaskStatus(taskId: string): Promise<TransactionStatusResponse | undefined>
  createRelayedTransaction(
    safe: Safe,
    transactions: MetaTransactionData[],
    options: MetaTransactionOptions
  ): Promise<SafeTransaction>
  sendSponsorTransaction(
    target: string,
    encodedTransaction: string,
    chainId: number
  ): Promise<RelayResponse>
  sendSyncTransaction(
    target: string,
    encodedTransaction: string,
    chainId: number,
    options: MetaTransactionOptions
  ): Promise<RelayResponse>
  relayTransaction({
    target,
    encodedTransaction,
    chainId,
    options
  }: RelayTransaction): Promise<RelayResponse>
}
