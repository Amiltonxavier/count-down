import { z } from "zod";

const envSchema = z.object({
  VITE_APP_CLERK_PUBLISHABLE_KEY: z.string(),
  VITE_APP_DATABASE_ID: z.string(),
  VITE_APP_COLLECTION_ID: z.string(),
  VITE_APP_PROJECT_ID: z.string(),
  VITE_APP_APPWRITE_URL: z.string().url(),
});

export const env = envSchema.parse(import.meta.env);
