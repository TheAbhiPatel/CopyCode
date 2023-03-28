import zod, { object, optional, string, TypeOf } from "zod";

export const postCategorySchema = object({
  body: object({
    userId: string({ required_error: "userId is Required" }),
    menuId: string({ required_error: "menuId is Required" }),
    name: string({ required_error: "name is Required" }),
    label: string({ required_error: "label is Required" }),
    value: string({ required_error: "value is Required" }),
    selected: zod
      .boolean({ invalid_type_error: "isActive must be a boolean" })
      .optional(),
  }),
});

export type postCategoryInput = TypeOf<typeof postCategorySchema>["body"];
