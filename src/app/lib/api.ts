import { Product } from "../types/product";

export const API_URL = "https://api.escuelajs.co/api/v1/products";

// get all products
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) return [];
        
        const data = await response.json();    
        return data;
    }
    catch (error) {
        console.error("Failed to fetch products", error);
        return [];
    }
};

// get product by id
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) return null;

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Failed to fetch product", error);
        return null;
    }
};