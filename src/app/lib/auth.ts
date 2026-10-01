import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.BETTER_AUTH_DB_URL) {
  throw new Error("Please add your BETTER_AUTH_DB_URLI to .env");
}

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db('better-auth-db');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
});