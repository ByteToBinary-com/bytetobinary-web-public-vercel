// Force-load .env BEFORE anything else
import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.BYTETOBINARY_DATABASE_URL!,
  },
});
