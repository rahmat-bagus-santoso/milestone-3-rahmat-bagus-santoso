export type Category = {
    id: number;
    name: string;
}

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    images: string[];
}