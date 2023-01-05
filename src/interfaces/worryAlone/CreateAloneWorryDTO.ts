interface aloneOption{
    title: string;
    advantage: string;
    disadvantage: string;
    image: string;
}

export interface CreateWorryAloneDTO {
    userId: number;
    title: string;
    content: string;
    categoryId: number;
    options: Array<aloneOption>;
}