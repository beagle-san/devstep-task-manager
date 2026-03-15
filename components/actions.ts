// app/tasks/[id]/edit/actions.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { taskSchema } from "@/lib/validators";

export async function updateTaskAction(id: string, values: any) {
  const parsed = taskSchema.safeParse(values);
  if (!parsed.success) return { error: "入力内容を確認してください" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "ログインしてください" };

  await supabase
    .from("tasks")
    .update({
      title: parsed.data.title,
      detail: parsed.data.detail || null,
      status: parsed.data.status,
      due_date: parsed.data.due_date || null,
    })
    .eq("id", id);
  //.eq("email", user.email);

  return { success: true };
}
