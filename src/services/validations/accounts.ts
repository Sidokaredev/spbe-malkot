import { z } from "zod";

const SignIn = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 6 characters" }),
  password: z
    .string()
    .min(3, { message: "your password must be at least 8 characters" }),
});

export { SignIn };
