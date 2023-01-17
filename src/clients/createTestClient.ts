import type { TestRequests } from '../types/eip1193'
import type { Transport } from './transports/createTransport'
import type { Client, ClientConfig } from './createClient'
import { createClient } from './createClient'
import type { Chain } from '../chains'

type TestClientModes = 'anvil' | 'hardhat'

export type TestClientConfig<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TMode extends TestClientModes = TestClientModes,
> = {
  chain?: ClientConfig<TTransport, TChain>['chain']
  /** The key of the client. */
  key?: ClientConfig['key']
  /** Mode of the test client. Available: "anvil" | "hardhat" */
  mode: TMode
  /** The name of the client. */
  name?: ClientConfig['name']
  /** Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds. */
  pollingInterval?: ClientConfig['pollingInterval']
  transport: ClientConfig<TTransport, TChain>['transport']
}

export type TestClient<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TMode extends TestClientModes = TestClientModes,
> = Client<TTransport, TChain, TestRequests<TMode>> & {
  mode: TMode
}

/**
 * @description Creates a test client with a given transport.
 *
 * - Only has access to "test" RPC methods (ie. `anvil_setBalance`,
 * `evm_mine`, etc).
 *
 * @example
 * import { local } from 'viem/chains'
 * import { createTestClient, http } from 'viem/clients'
 * const client = createTestClient(http({ chain: local }), { mode: 'anvil' })
 */
export function createTestClient<
  TTransport extends Transport,
  TChain extends Chain,
  TMode extends TestClientModes,
>({
  chain,
  key = 'test',
  name = 'Test Client',
  mode,
  pollingInterval,
  transport,
}: TestClientConfig<TTransport, TChain, TMode>): TestClient<
  TTransport,
  TChain,
  TMode
> {
  return {
    ...createClient({
      chain,
      key,
      name,
      pollingInterval,
      transport,
      type: 'testClient',
    }),
    mode,
  }
}