import { Timestamp } from "firebase/firestore";

export type CardType = {
    id: number;
    content: string;
}

export type ListType = {
    id: string;
    index: number;
    title: string;
    cards: CardType[];
}

export type BoardType = {
    id: string;
    title: string;
    color: string;
    userId: string;
    username: string;
    createdAt: Timestamp,
    members: string[];
}

export type UserType = {
    userId: string; 
    username: string;
    email: string;
    profilePic: string;
    createdAt: Timestamp;
}