import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'
import { SafeVersion } from '@safe-global/safe-core-sdk-types'
import CompatibilityFallbackHandler_V1_3_0_Ethers from './CompatibilityFallbackHandler/v1.3.0/CompatibilityFallbackHandler_V1_3_0_Ethers'
import CreateCallContract_V1_3_0_Ethers from './CreateCall/v1.3.0/CreateCallEthersContract_V1_3_0_Ethers'
import GnosisSafeContract_V1_0_0_Ethers from './GnosisSafe/v1.0.0/GnosisSafeContract_V1_0_0_Ethers'
import GnosisSafeContract_V1_1_1_Ethers from './GnosisSafe/v1.1.1/GnosisSafeContract_V1_1_1_Ethers'
import GnosisSafeContract_V1_2_0_Ethers from './GnosisSafe/v1.2.0/GnosisSafeContract_V1_2_0_Ethers'
import GnosisSafeContract_V1_3_0_Ethers from './GnosisSafe/v1.3.0/GnosisSafeContract_V1_3_0_Ethers'
import GnosisSafeProxyFactoryContract_V1_0_0_Ethers from './GnosisSafeProxyFactory/v1.0.0/GnosisSafeProxyFactoryContract_V1_0_0_Ethers'
import GnosisSafeProxyFactoryContract_V1_1_1_Ethers from './GnosisSafeProxyFactory/v1.1.1/GnosisSafeProxyFactoryContract_V1_1_1_Ethers'
import GnosisSafeProxyFactoryContract_V1_3_0_Ethers from './GnosisSafeProxyFactory/v1.3.0/GnosisSafeProxyFactoryContract_V1_3_0_Ethers'
import MultiSendContract_V1_1_1_Ethers from './MultiSend/v1.1.1/MultiSendContract_V1_1_1_Ethers'
import MultiSendContract_V1_3_0_Ethers from './MultiSend/v1.3.0/MultiSendContract_V1_3_0_Ethers'
import MultiSendCallOnlyContract_V1_3_0_Ethers from './MultiSendCallOnly/v1.3.0/MultiSendCallOnlyContract_V1_3_0_Ethers'
import SignMessageLibContract_V1_3_0_Ethers from './SignMessageLib/v1.3.0/SignMessageLibContract_V1_3_0_Ethers'
export declare function getSafeContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
):
  | GnosisSafeContract_V1_3_0_Ethers
  | GnosisSafeContract_V1_2_0_Ethers
  | GnosisSafeContract_V1_1_1_Ethers
  | GnosisSafeContract_V1_0_0_Ethers
export declare function getCompatibilityFallbackHandlerContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
): CompatibilityFallbackHandler_V1_3_0_Ethers
export declare function getMultiSendContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
): MultiSendContract_V1_3_0_Ethers | MultiSendContract_V1_1_1_Ethers
export declare function getMultiSendCallOnlyContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
): MultiSendCallOnlyContract_V1_3_0_Ethers
export declare function getSafeProxyFactoryContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
):
  | GnosisSafeProxyFactoryContract_V1_3_0_Ethers
  | GnosisSafeProxyFactoryContract_V1_1_1_Ethers
  | GnosisSafeProxyFactoryContract_V1_0_0_Ethers
export declare function getSignMessageLibContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
): SignMessageLibContract_V1_3_0_Ethers
export declare function getCreateCallContractInstance(
  safeVersion: SafeVersion,
  contractAddress: string,
  signerOrProvider: Signer | Provider
): CreateCallContract_V1_3_0_Ethers
