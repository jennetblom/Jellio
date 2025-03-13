export type CardType = {
    id: number;
    content: string;
}

export type ListType = {
    id: number;
    title: string;
    cards: CardType[];
}

export type BoardType = {
    id: string;
    title: string;
    color: string;
    userId: string;
    lists: ListType[];
    createdAt: Date,
    updatedAt: Date,
}