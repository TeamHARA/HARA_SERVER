interface withOption{
    title: string;
    advantage: string;
    disadvantage: string;
    image: string;
    hasImage: boolean;
}

export interface CreateWorryWithDTO {
    userId: number;
    title: string;
    content: string;
    categoryId: number;
    options: Array<withOption>;
}