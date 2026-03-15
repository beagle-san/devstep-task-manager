import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "@/components/TaskForm";
import { taskSchema } from "@/lib/validators";

type Props = {
  params: { id: string };
};

export default async function EditTaskPage({ params }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("email", user.email)
    .single();

  console.log("EditTaskPage");
  console.log(task);

  if (error || !task) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">タスク編集</h1>
      <TaskForm
        submitLabel="更新"
        initialValues={{
          title: task.title,
          detail: task.detail ?? "",
          due_date: task.due_date ?? "",
          status: task.status,
        }}
        id={id}
        // action={(values) => updateTask(task.id, values)}
      />
    </div>
  );
}
