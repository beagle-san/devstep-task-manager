import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "@/components/TaskForm";
import { taskSchema } from "@/lib/validators";
import { updateTaskAction } from "./actions";

export function BridgeToTaskForm({ id, initialValues }) {
  async function handleSubmit(formData) {
    const values = {
      title: formData.get("title"),
      detail: formData.get("detail"),
      due_date: formData.get("due_date"),
      status: formData.get("status"),
    };

    await updateTaskAction(id, values);
  }

  return <form action={handleSubmit}>...</form>;
}

type Props = {
  params: { id: string };
};

// async function updateTask(id: string, values: any) {
//   "use server";
//   const parsed = taskSchema.safeParse(values);
//   if (!parsed.success) {
//     return { error: "入力内容を確認してください" };
//   }

//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) {
//     redirect("/login");
//   }

//   const { error } = await supabase
//     .from("tasks")
//     .update({
//       title: parsed.data.title,
//       detail: parsed.data.detail || null,
//       status: parsed.data.status,
//       due_date: parsed.data.due_date || null,
//     })
//     .eq("id", id)
//     .eq("email", user.email);

//   if (error) {
//     console.error(error);
//     return { error: "更新に失敗しました" };
//   }
// }

export default async function EditTaskPage({ params }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // asynchronous access of `params.id`.
  const { id } = await params;
  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("email", user.email)
    .single();

  if (error || !task) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">タスク編集</h1>
      {/* <BridgeToTaskForm
        id={id}
        initialValues={{
          title: task.title,
          detail: task.detail ?? "",
          due_date: task.due_date ?? "",
          status: task.status,
        }}
      /> */}
    </div>
  );
}
