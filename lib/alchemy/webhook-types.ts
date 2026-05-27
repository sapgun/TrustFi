/**
 * Alchemy Webhook 이벤트 타입 정의
 */

export interface AlchemyWebhookEvent {
  webhookId: string
  id: string
  createdAt: string
  type: "ADDRESS_ACTIVITY" | "NFT_ACTIVITY" | "CUSTOM_WEBHOOK"
  event: AddressActivityEvent | NFTActivityEvent | CustomWebhookEvent
}

export interface AddressActivityEvent {
  network: string
  activity: Activity[]
}

export interface Activity {
  fromAddress: string
  toAddress: string
  blockNum: string
  hash: string
  value: number
  asset: string
  category: "external" | "internal" | "erc20" | "erc721" | "erc1155"
  rawContract?: {
    rawValue: string
    address: string
    decimals: number
  }
  log?: {
    address: string
    topics: string[]
    data: string
  }
}

export interface NFTActivityEvent {
  network: string
  activity: NFTActivity[]
}

export interface NFTActivity {
  fromAddress: string
  toAddress: string
  contractAddress: string
  tokenId: string
  category: "erc721" | "erc1155"
}

export interface CustomWebhookEvent {
  [key: string]: unknown
}

export interface WebhookProcessingResult {
  success: boolean
  message: string
  trustScoreUpdated?: boolean
  notificationSent?: boolean
}
