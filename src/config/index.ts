export const CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || "development",
  IS_DEV: process.env.NEXT_PUBLIC_APP_ENV === "development",
  IS_PROD: process.env.NEXT_PUBLIC_APP_ENV === "production",
} as const;

// Validation (optional but recommended for a boilerplate)
if (!process.env.NEXT_PUBLIC_API_URL && typeof window === "undefined") {
  console.warn(
    "⚠️ NEXT_PUBLIC_API_URL is not defined. Falling back to default: http://localhost:3000/api"
  );
}
