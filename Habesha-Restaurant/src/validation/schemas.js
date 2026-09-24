import { z } from 'zod'

const requiredText = (label) => z.string().trim().min(1, `${label} is required.`)

export const loginSchema = z.object({
    email: z.string().trim().email('Enter a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
})

export const registerSchema = z.object({
    fullName: requiredText('Full name'),
    email: z.string().trim().email('Enter a valid email address.'),
    password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export const reservationSchema = z.object({
    name: requiredText('Full name'),
    phone: z.string().trim().min(7, 'Enter a valid phone number.'),
    email: z.string().trim().email('Enter a valid email address.'),
    date: z.string().min(1, 'Reservation date is required.'),
    guests: z.string().min(1, 'Choose the number of guests.'),
    occasion: z.string().min(1, 'Choose an occasion.'),
    notes: z.string().max(500, 'Special requests must be 500 characters or fewer.'),
    time: z.string().min(1, 'Choose a reservation time.'),
})

export const checkoutSchema = z.object({
    name: requiredText('Contact name'),
    phone: z.string().trim().min(7, 'Enter a valid phone number.'),
    email: z.string().trim().email('Enter a valid email address.'),
    delivery: z.enum(['home', 'pickup']),
    address: requiredText('Delivery address'),
})
