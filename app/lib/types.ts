import { z } from "zod";

export type FormState =
    | {
          error?: {
              name?: string[];
              username?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;

export const LoginFormSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty("Password is required"),
});
