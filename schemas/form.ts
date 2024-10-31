import * as z from "zod";
export const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable().optional(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
