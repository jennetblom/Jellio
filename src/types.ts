export type Card = {
    id: number;
    content: string;
}
export type List = {
    id: number;
    title: string;
    cards: Card[];

}
export type Board = {
    id: string;
    title: string;
    color: string;
    lists: List[];
}