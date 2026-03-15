import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "@/components/TaskForm";
import { taskSchema } from "@/lib/validators";

async function createTask(values: any) {
  "use server";
  const parsed = taskSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "入力内容を確認してください" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("tasks").insert({
    title: parsed.data.title,
    detail: parsed.data.detail || null,
    status: parsed.data.status,
    due_date: parsed.data.due_date || null,
    email: user!.email,
  });

  if (error) {
    console.error(error);
    return { error: "保存に失敗しました" };
  }
}

export default async function NewTaskPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">タスク作成</h1>
      <TaskForm submitLabel="保存" action={createTask} />
    </div>
  );
}
