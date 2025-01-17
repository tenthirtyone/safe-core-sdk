import { GnosisSafeProxyFactoryContract } from '@safe-global/safe-core-sdk-types'
import { Proxy_factory as ProxyFactory_V1_0_0 } from '../../../../../typechain/src/web3-v1/v1.0.0/Proxy_factory'
import { Proxy_factory as ProxyFactory_V1_1_1 } from '../../../../../typechain/src/web3-v1/v1.1.1/Proxy_factory'
import { Proxy_factory as ProxyFactory_V1_3_0 } from '../../../../../typechain/src/web3-v1/v1.3.0/Proxy_factory'
import { Web3TransactionOptions } from '../../../../adapters/web3/types'
export interface CreateProxyProps {
  safeMasterCopyAddress: string
  initializer: string
  saltNonce: string
  options?: Web3TransactionOptions
  callback?: (txHash: string) => void
}
declare class GnosisSafeProxyFactoryWeb3Contract implements GnosisSafeProxyFactoryContract {
  contract: ProxyFactory_V1_3_0 | ProxyFactory_V1_1_1 | ProxyFactory_V1_0_0
  constructor(contract: ProxyFactory_V1_3_0 | ProxyFactory_V1_1_1 | ProxyFactory_V1_0_0)
  getAddress(): string
  proxyCreationCode(): Promise<string>
  createProxy({
    safeMasterCopyAddress,
    initializer,
    saltNonce,
    options,
    callback
  }: CreateProxyProps): Promise<string>
  encode(methodName: string, params: any[]): string
  estimateGas(methodName: string, params: any[], options: Web3TransactionOptions): Promise<string>
}
export default GnosisSafeProxyFactoryWeb3Contract
