import { CompatibilityFallbackHandlerContract } from '@safe-global/safe-core-sdk-types'
import { Compatibility_fallback_handler as CompatibilityFallbackHandler_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Compatibility_fallback_handler'
declare abstract class CompatibilityFallbackHandlerWeb3Contract
  implements CompatibilityFallbackHandlerContract
{
  contract: CompatibilityFallbackHandler_V1_3_0
  constructor(contract: CompatibilityFallbackHandler_V1_3_0)
  getAddress(): string
  encode(methodName: string, params: any[]): string
}
export default CompatibilityFallbackHandlerWeb3Contract
