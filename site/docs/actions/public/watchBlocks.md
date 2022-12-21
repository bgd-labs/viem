# watchBlocks

Watches and returns information for incoming blocks.

## Import

```ts
import { watchBlocks } from 'viem'
```

## Usage

Pass through your Public Client, along with a listener.

```ts
import { watchBlocks } from 'viem'
import { publicClient } from '.'
 
const unwatch = watchBlocks( // [!code focus:99]
  publicClient,
  block => console.log(block)
)
/**
 * > {
 *  baseFeePerGas: 10789405161n,
 *  difficulty: 11569232145203128n,
 *  extraData: '0x75732d656173742d38',
 *  ...
 * }
 * 
 * > {
 *  baseFeePerGas: 12394051511n,
 *  difficulty: 11512315412421123n,
 *  extraData: '0x5123ab1512dd14aa',
 *  ...
 * }
 */
```

## Listener

`(block: Block) => void`

The block information.

## Returns

`UnwatchFn`

A function that can be invoked to stop watching for new blocks.

## Configuration

### blockTag (optional)

- **Type:** `'latest' | 'earliest' | 'pending' | 'safe' | 'finalized'`
- **Default:** `'latest'`

Watch for new blocks on a given tag.

```ts
const unwatch = watchBlocks(
  client,
  block => console.log(block),
  { blockTag: 'safe' } // [!code focus]
)
```

### emitMissed (optional)

- **Type:** `boolean`
- **Default:** `false`

Whether or not to emit missed blocks to the callback. 

Missed blocks may occur in instances where internet connection is lost, or the block time is lesser than the [polling interval](/TODO) of the client.

```ts
const unwatch = watchBlocks(
  client,
  block => console.log(block),
  { emitMissed: true } // [!code focus]
)
```

### emitOnBegin (optional)

- **Type:** `boolean`
- **Default:** `false`

Whether or not to emit the block to the callback when the subscription opens.

```ts
const unwatch = watchBlocks(
  client,
  block => console.log(block),
  { emitOnBegin: true } // [!code focus]
)
```

### pollingInterval (optional)

- **Type:** `number`

Polling frequency (in ms). Defaults to the Client's `pollingInterval` config.

```ts
const unwatch = watchBlocks(
  client,
  block => console.log(block),
  { pollingInterval: 12_000 } // [!code focus]
)
```

## Example

<iframe frameborder="0" width="100%" height="500px" src="https://replit.com/@jxom/TODO"></iframe>