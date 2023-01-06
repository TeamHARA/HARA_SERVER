interface aloneOption{
    title: string;
    advantage: string;
    disadvantage: string;
    image: string;
    hasImage: boolean;
}

export interface CreateAloneWorryDTO {
    userId: number;
    title: string;
    content: string;
    categoryId: number;
    options: Array<aloneOption>;
    
}