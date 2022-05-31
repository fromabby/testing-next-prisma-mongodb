export interface Item {
    id: string
    shySkullId: number
    rarity: string
    isAvailable: boolean
    mintDate?: Date
    userId?: string
}

export interface Discord {
    username: string
    tag: string
}

export interface User {
    id: string
    nearId: string
    discord: Discord
    tickets?: Ticket[]
    items?: Item[]
}

export interface Ticket {
    id: string
    ticketName: string
    ticketNumber: number
    userId: string
    isMinted: boolean
    mintDate?: Date
}
