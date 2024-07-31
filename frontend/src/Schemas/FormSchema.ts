import {z} from 'zod'

export const registerSchema = z.object({
    firstName:z.string().min(1,{message:"FirstName is required!"}),
    lastName :z.string().min(1,{message:"LastName is required!"}),
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

export const hotelFormDataSchema = z.object({
    name: z.string().min(1, 'Name required'),
    city: z.string().min(1, 'City required'),
    country: z.string().min(1, 'Country required'),
    description: z.string().min(1, 'Description required'),
    type: z.string().min(1, 'Type required'),
    adultCount: z.number().min(1, "At least one adult is required"),
    childCount: z.number().nonnegative("Child count cannot be negative"),
    starRating: z.number().min(1, "Star rating must be at least 1").max(5, "Star rating must be at most 5"),
    facilities: z.array(z.string()).min(1, "At least one facility is required"),
    pricePerNight: z.number().positive("Price per night must be positive"),
    imageFiles: z.instanceof(FileList).optional().refine(files => files && files.length > 0, {
        message: 'At least one image file is required',
      }),
});