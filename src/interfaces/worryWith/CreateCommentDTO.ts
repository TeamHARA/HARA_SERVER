export interface CreateCommentDTO {
    withWorryId: number;
    userId: number;
    content: string;
    isAnonymous: boolean;
}