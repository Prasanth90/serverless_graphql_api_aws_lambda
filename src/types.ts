export interface MatchResult {
    playerOneId: string
    playerTwoId: string
    winnerId: string
}

export interface Player {
    playerId: string
    firstName: string
    lastName: string
    country: string
}

export interface PlayerStats {
    playerId: string
    firstName: string
    lastName: string
    country: string
    wins: number
    losses: number
}