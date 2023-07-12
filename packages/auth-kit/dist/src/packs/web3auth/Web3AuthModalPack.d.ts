import { IAdapter, UserInfo } from '@web3auth/base'
import { ModalConfig, Web3AuthOptions } from '@web3auth/modal'
import { ExternalProvider } from '@ethersproject/providers'
import type { SafeAuthPack } from '../../types'
import { Web3AuthEvent, Web3AuthEventListener } from './types'
/**
 * Web3AuthModalPack implements the SafeAuthClient interface for adapting the Web3Auth service provider
 * @class
 */
export declare class Web3AuthModalPack implements SafeAuthPack<Web3AuthModalPack> {
  #private
  provider: ExternalProvider | null
  private web3authInstance?
  /**
   *
   * @param options Web3Auth options {@link https://web3auth.io/docs/sdk/web/modal/initialize#arguments}
   * @param config Web3Auth adapters {@link https://web3auth.io/docs/sdk/web/modal/initialize#configuring-adapters}
   * @param modalConfig The modal configuration {@link https://web3auth.io/docs/sdk/web/modal/whitelabel#whitelabeling-while-modal-initialization}
   */
  constructor(
    options: Web3AuthOptions,
    adapters?: IAdapter<unknown>[],
    modalConfig?: Record<string, ModalConfig>
  )
  /**
   * Initialize the Web3Auth service provider
   * @throws Error if there was an error initializing Web3Auth
   */
  init(): Promise<void>
  /**
   * Connect to the Web3Auth service provider
   * @returns
   */
  signIn(): Promise<void>
  /**
   * Disconnect from the Web3Auth service provider
   */
  signOut(): Promise<void>
  /**
   * Get authenticated user information
   * @returns The user info
   */
  getUserInfo(): Promise<Partial<UserInfo>>
  /**
   * Allow to subscribe to the Web3Auth events
   * @param event The event you want to subscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  subscribe(event: Web3AuthEvent, handler: Web3AuthEventListener): void
  /**
   * Allow to unsubscribe to the Web3Auth events
   * @param event The event you want to unsubscribe to (https://web3auth.io/docs/sdk/web/modal/initialize#subscribing-the-lifecycle-events)
   * @param handler The event handler
   */
  unsubscribe(event: Web3AuthEvent, handler: Web3AuthEventListener): void
}
