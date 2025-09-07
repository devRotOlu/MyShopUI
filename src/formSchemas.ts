import { z } from "zod";

export const productReviewSchema = z
  .object({
    rating: z.number(),
    review: z.string(),
  })
  .refine((data) => data.rating > 0 && data.review, {
    message: "Review and Rating must be filled to submit",
    path: ["review"],
  });

export const deliveryAddressSchema = z.object({
  firstName: z.string().min(1, "First name cannot be empty"),
  lastName: z.string().min(1, "Last name cannot be empty"),
  streetAddress: z.string().min(1, "Street address cannot be empty"),
  city: z.string().min(1, "City cannot be empty"),
  state: z.string().min(1, "State cannot be empty"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number cannot exceed 15 digits").regex(/^\d+$/, "Phone number must contain only digits"),
  lga: z.string().min(1, "LGA cannot be empty"),
  directions: z.string().optional(),
});

export const profileSchema = z
  .object({
    firstName: z.string().min(1, "Name cannot be empty"),
    lastName: z.string().min(1, "Name cannot be empty"),
    streetAddress: z.string().min(1, "Street address cannot be empty"),
    state: z.string().min(1, "State cannot be empty").default(""),
    city: z.string().min(1, "City cannot be empty"),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "Invalid password")
      .optional(),
  })
  .refine((data) => (!data.currentPassword && !data.newPassword) || (data.currentPassword && data.newPassword), {
    message: "Both current and new password are required when changing password",
    path: ["currentPassword"],
  });

export const monnifyCardSchema = z.object({
  number: z.string().regex(/^\d{13,22}$/, { message: "Card number must be between 13 and 22 digits" }),

  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),

  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format" }),

  pin: z.string().regex(/^\d{4}$/, { message: "PIN must be exactly 4 digits" }),
});

export const monnifyTransferSchema = z.object({
  bankCode: z.coerce.number().refine((num) => num >= 100 && num <= 999, {
    message: "Bank Code must be 3-digit number",
  }),
});

export const baseAuthSchema = z.object({
  email: z.email("Invalid email"),
});

export const loginSchema = baseAuthSchema.extend({
  password: z.string().min(1, "Invalid password"),
});

export const passwordResetSchema = z
  .object({
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "Invalid password"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signUpSchema = baseAuthSchema.extend({
  firstName: z.string().min(1, "Name cannot be empty"),
  lastName: z.string().min(1, "Name cannot be empty"),
  phoneNumber: z.string().regex(/^(?:\+\d{13}|\d{11})$/, "Invalid phone number"),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, "Invalid password"),
});
