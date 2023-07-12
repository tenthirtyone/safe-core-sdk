import { RelayPack } from '@safe-global/relay-kit'
export declare enum OperationType {
  Call = 0,
  DelegateCall = 1
}
export interface AccountAbstractionConfig {
  relayPack: RelayPack
}
