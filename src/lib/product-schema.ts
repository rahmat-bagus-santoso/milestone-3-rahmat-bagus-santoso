import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(1),
    price: z.number().positive(),
    description: z.string().min(1),
    category: z.string().min(1),
});
