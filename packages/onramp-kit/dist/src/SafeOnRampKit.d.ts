import {
  SafeOnRampPack,
  SafeOnRampEvent,
  SafeOnRampEventListener,
  SafeOnRampOpenOptions,
  SafeOnRampInitOptions,
  SafeOnRampOpenResponse
} from './types'
/**
 * This class allows to initialize the Safe OnRamp Kit for convert fiat to crypto
 * @class SafeOnRampKit
 */
export declare class SafeOnRampKit<TPack extends SafeOnRampPack<TPack>> {
  #private
  /**
   * Initialize the SafeOnRampKit
   * @constructor
   * @param pack The pack implementing the SafeOnRampClient interface for the specific provider
   */
  constructor(pack: TPack)
  /**
   * This method initializes the SafeOnRampKit asynchronously. This is the place where we can put initialization magic
   * @param pack The pack implementing the SafeOnRampClient interface for the specific provider
   * @param options The options to initialize the specific pack
   * @returns A SafeOnRampKit instance
   * @throws Error if the pack is not defined
   */
  static init<TPack extends SafeOnRampPack<TPack>>(
    pack: TPack,
    options?: SafeOnRampInitOptions<TPack>
  ): Promise<SafeOnRampKit<TPack>>
  /**
   * This method opens the onramp widget using the provided options
   * @param options The options to open the specific onramp widget. Should be different per provider
   */
  open(options?: SafeOnRampOpenOptions<TPack>): Promise<SafeOnRampOpenResponse<TPack>>
  /**
   * This method cleanup the onramp widget
   */
  close(): Promise<void>
  /**
   * Subscribe to provider events
   * @param event The specific event to subscribe to
   * @param handler The handler to be called when the event is triggered
   */
  subscribe(event: SafeOnRampEvent<TPack>, handler: SafeOnRampEventListener<TPack>): void
  /**
   * Unsubscribe from provider events
   * @param event The specific event to unsubscribe from
   * @param handler The handler to be removed from the event
   */
  unsubscribe(event: SafeOnRampEvent<TPack>, handler: SafeOnRampEventListener<TPack>): void
}
