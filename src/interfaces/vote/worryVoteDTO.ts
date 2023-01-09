export interface CreateVoteDTO {
    userId: number;
    worryWithId: number;
    optionId: number;
}

export interface findVoteDTO {
    userId: number;
    worryWithId: number;
}