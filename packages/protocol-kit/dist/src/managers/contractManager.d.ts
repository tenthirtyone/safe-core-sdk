import { ContractNetworksConfig, SafeConfig } from '../types'
import {
  GnosisSafeContract,
  MultiSendCallOnlyContract,
  MultiSendContract
} from '@safe-global/safe-core-sdk-types'
declare class ContractManager {
  #private
  static create(config: SafeConfig): Promise<ContractManager>
  init(config: SafeConfig): Promise<void>
  get contractNetworks(): ContractNetworksConfig | undefined
  get isL1SafeMasterCopy(): boolean | undefined
  get safeContract(): GnosisSafeContract | undefined
  get multiSendContract(): MultiSendContract
  get multiSendCallOnlyContract(): MultiSendCallOnlyContract
}
export default ContractManager
