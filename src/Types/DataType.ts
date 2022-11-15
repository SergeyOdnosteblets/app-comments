import { PostType } from "./PostType";

export interface DataType {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: {
        image: {
            png: string;
            webp: string;
        };
        username: string;
    }
    replies: PostType[]
}