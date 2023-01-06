interface withOption{
    title: string;
    advantage: string;
    disadvantage: string;
    image: string;
    hasImage: boolean;
}

export interface CreateWithWorryDTO {
    userId: number;
    title: string;
    content: string;
    commentOn: boolean;
    categoryId: number;
    options: Array<withOption>;
}