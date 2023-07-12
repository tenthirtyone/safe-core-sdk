import { ethers } from 'ethers'
import {
  ISafeAuthKit,
  SafeAuthPack,
  SafeAuthConfig,
  SafeAuthEvent,
  SafeAuthEventListener,
  SafeAuthSignInData
} from './types'
/**
 * SafeAuthKit provides a simple interface for web2 logins
 */
export declare class SafeAuthKit<TPack extends SafeAuthPack<TPack>> implements ISafeAuthKit<TPack> {
  #private
  safeAuthData?: SafeAuthSignInData
  /**
   * Initialize the SafeAuthKit
   * @constructor
   * @param pack The pack implementing the SafeAuthClient interface
   * @param config The configuration options
   */
  constructor(pack: TPack, config?: SafeAuthConfig)
  /**
   * The static method allows to initialize the SafeAuthKit asynchronously
   * @param providerType Choose the provider service to use
   * @param config The configuration including the one for the specific provider
   * @returns A SafeAuthKit instance
   * @throws Error if the provider type is not supported
   */
  static init<TPack extends SafeAuthPack<TPack>>(
    pack: TPack,
    config?: SafeAuthConfig
  ): Promise<SafeAuthKit<TPack>>
  /**
   * Authenticate the user
   * @returns the derived external owned account and the safes associated with the user if the txServiceUrl is provided
   * @throws Error if the provider was not created
   * @throws Error if there was an error while trying to get the safes for the current user using the provided txServiceUrl
   */
  signIn(): Promise<SafeAuthSignInData>
  /**
   * Sign out the user
   */
  signOut(): Promise<void>
  /**
   *
   * @returns The Ethereum provider
   */
  getProvider(): ethers.providers.ExternalProvider | null
  /**
   * Retrieve the user info
   */
  getUserInfo(): Promise<import('./types').SafeGetUserInfoResponse<TPack> | null>
  /**
   * Subscribe to an event
   * @param eventName The event name to subscribe to. Choose from SafeAuthEvents type
   * @param listener The callback function to be called when the event is emitted
   */
  subscribe(event: SafeAuthEvent<TPack>, listener: SafeAuthEventListener<TPack>): void
  /**
   * Unsubscribe from an event
   * @param eventName The event name to unsubscribe from. Choose from SafeAuthEvents type
   * @param listener The callback function to unsubscribe
   */
  unsubscribe(event: SafeAuthEvent<TPack>, listener: SafeAuthEventListener<TPack>): void
}
