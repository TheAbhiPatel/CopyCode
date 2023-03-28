import zod, { object, optional, string, TypeOf } from "zod";

export const postMenuSchema = object({
  body: object({
    userId: string({ required_error: "userId is Required" }),
    name: string({ required_error: "name is Required" }),
    label: string({ required_error: "label is Required" }),
    value: string({ required_error: "value is Required" }),
    password: string().min(6, "password must be 6 char long").optional(),
    isProtected: zod
      .boolean({
        invalid_type_error: "isActive must be a boolean",
      })
      .optional(),
    selected: zod
      .boolean({ invalid_type_error: "isActive must be a boolean" })
      .optional(),
  }),
});

export type postMenuInput = TypeOf<typeof postMenuSchema>["body"];
