import { SafeSetupConfig } from '@safe-global/safe-core-sdk-types'
import { Web3TransactionOptions, Web3TransactionResult } from '../../../../../adapters/web3/types'
import { Gnosis_safe as GnosisSafe } from '../../../../../../typechain/src/web3-v1/v1.0.0/Gnosis_safe'
import GnosisSafeContractWeb3 from '../GnosisSafeContractWeb3'
declare class GnosisSafeContract_V1_0_0_Web3 extends GnosisSafeContractWeb3 {
  contract: GnosisSafe
  constructor(contract: GnosisSafe)
  setup(
    setupConfig: SafeSetupConfig,
    options?: Web3TransactionOptions
  ): Promise<Web3TransactionResult>
  getModules(): Promise<string[]>
  isModuleEnabled(moduleAddress: string): Promise<boolean>
}
export default GnosisSafeContract_V1_0_0_Web3
