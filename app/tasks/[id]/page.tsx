import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { DeleteButton } from "./DeleteButton";

type Props = {
  params: { id: string };
};

export default async function TaskDetailPage({ params }: Props) {
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

  async function deleteTask() {
    "use server";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      redirect("/login");
    }
    const { id } = await params;
    await supabase.from("tasks").delete().eq("id", id).eq("email", user.email);
    redirect("/tasks");
  }

  // function toJST(dateString: string): string {
  //   const date = new Date(dateString);
  //   return new Date(date.getTime() + 9 * 60 * 60 * 1000).toString();
  // }

  function formatJST(dateString: string) {
    return new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(dateString));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">{task.title}</h1>
        <TaskStatusBadge status={task.status} />
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p className="whitespace-pre-wrap">{task.detail || "（詳細なし）"}</p>
        <p>期限日: {task.due_date ?? "未設定"}</p>
        <p>作成日時: {formatJST(task.created_at)}</p>
        <p>更新日時: {formatJST(task.updated_at)}</p>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          編集
        </Link>

        <DeleteButton action={deleteTask} />
      </div>
    </div>
  );
}
