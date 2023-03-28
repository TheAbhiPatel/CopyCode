import zod, { object, optional, string, TypeOf } from "zod";

export const postSubCategorySchema = object({
  body: object({
    userId: string({ required_error: "userId is Required" }),
    menuId: string({ required_error: "menuId is Required" }),
    categoryId: string({ required_error: "categoryId is Required" }),
    name: string({ required_error: "name is Required" }),
    label: string({ required_error: "label is Required" }),
    value: string({ required_error: "value is Required" }),
  }),
});

export type postSubCategoryInput = TypeOf<typeof postSubCategorySchema>["body"];
