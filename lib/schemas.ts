import { z } from "zod";

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use format YYYY-MM-DD"),
  email: z.string().email("Enter a valid email address"),
});

export const addressSchema = z.object({
  houseNumber: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid US zip code"),
  country: z.string().min(1, "Country is required"),
});

export const documentSchema = z.object({
  idType: z.string().min(1, "ID type is required"),
  idNumber: z.string().min(1, "ID number is required"),
  idFirstName: z.string().min(1, "First name is required"),
  idLastName: z.string().min(1, "Last name is required"),
  idDob: z
    .string()
    .min(1, "Date of birth is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use format YYYY-MM-DD"),
});

export const extractionResponseSchema = z.object({
  idType: z.string().nullable(),
  idNumber: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  dob: z.string().nullable(),
  reasons: z.record(z.string(), z.string()),
});

export type PersonalInput = z.infer<typeof personalSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
export type ExtractionResponse = z.infer<typeof extractionResponseSchema>;
