import { z } from 'zod';
// ==========================================
// Authentication & User Types
// ==========================================
export const registerSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name: z.string().min(2, 'Name must be at least 2 characters long'),
});
export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});
//# sourceMappingURL=index.js.map