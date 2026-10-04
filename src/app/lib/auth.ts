import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

if (!process.env.BETTER_AUTH_DB_URL) {
  throw new Error("Please add your BETTER_AUTH_DB_URL to .env");
}

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPasswordEmail: async ({ user, url,token }, request) => {

      void resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // See Step 2 below
        to: user.email,
        subject: "Reset your password",
        html: `<h1>Reset your password</h1>
        <p>Click the button to reset your password</p>
        <a href="${url}">Reset Password</a>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url  }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>", // See Step 2 below
          to: user.email,
          subject: "Verify your email",
          html: `<h1>Verify your email</h1>
          <p>Click the button to verify your email</p>
          <a href="${url}">Verify Email</a>`,
        });

        if (error) {
          console.error("Resend API Error:", error);
        } else {
          console.log("Verification email successfully sent:", data);
        }
      } catch (err) {
        console.error("Failed to execute Resend:", err);
      }
    }, // <-- CHANGED: Replaced the extra '}' with a ','
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string,
    },
  },
});