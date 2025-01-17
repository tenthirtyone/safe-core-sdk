import { MultiSendContract } from '@safe-global/safe-core-sdk-types'
import { Multi_send as MultiSend_V1_1_1 } from '../../../../../typechain/src/web3-v1/v1.1.1/Multi_send'
import { Multi_send as MultiSend_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Multi_send'
declare abstract class MultiSendWeb3Contract implements MultiSendContract {
  contract: MultiSend_V1_3_0 | MultiSend_V1_1_1
  constructor(contract: MultiSend_V1_3_0 | MultiSend_V1_1_1)
  getAddress(): string
  encode(methodName: string, params: any[]): string
}
export default MultiSendWeb3Contract
