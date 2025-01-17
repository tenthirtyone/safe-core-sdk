import { MultiSendCallOnlyContract } from '@safe-global/safe-core-sdk-types'
import { Multi_send_call_only as MultiSendCallOnly_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Multi_send_call_only'
declare abstract class MultiSendCallOnlyWeb3Contract implements MultiSendCallOnlyContract {
  contract: MultiSendCallOnly_V1_3_0
  constructor(contract: MultiSendCallOnly_V1_3_0)
  getAddress(): string
  encode(methodName: string, params: any[]): string
}
export default MultiSendCallOnlyWeb3Contract
