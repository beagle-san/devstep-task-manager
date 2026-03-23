import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルは必須です")
    .max(100, "タイトルは100文字以内で入力してください"),
  detail: z
    .string()
    .max(500, "詳細は500文字以内で入力してください")
    .optional()
    .or(z.literal("")),
  due_date: z.string().optional().or(z.literal("")), // 空文字許容（未設定）
  status: z.enum(["todo", "done"]).default("todo"),
});

export type TaskInput = z.infer<typeof taskSchema>;
