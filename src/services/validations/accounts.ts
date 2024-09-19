import { z } from "zod";

const SignIn = z.object({
  username: z.string().min(3, { message: "username minimal 3 karakter" }),
  password: z.string().min(3, { message: "password minimal 3 karakter" }),
});

export { SignIn };
