import {z} from 'zod'

export const registerSchema = z.object({
    firstName:z.string().min(1,{message:"FirstName is required!"}),
    lastName :z.string().min(1,{message:"LatsName is required!"}),
    email    :z.string().email(),
    password :z.string().min(8,{ message: 'Invalid Password'}).max(12),
    password_confirmation :z.string()
}).refine((data) => data.password === data. password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

export const loginSchema = z.object({
    email    :z.string().email(),
    password :z.string().min(8,{ message: 'Invalid Password'}).max(12),
})