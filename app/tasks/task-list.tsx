import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskStatusBadge } from "@/components/TaskStatusBadge";
import { LogoutButton } from "@/components/logout-button";
import { ToggleStatus } from "./ToggleStatus";

export default async function TaskList() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, status, due_date, created_at")
    //.eq("email", user.email)
    .order("created_at", { ascending: false });

  console.log(tasks);
  if (error) {
    console.error(error);
  }

  // function toJST(dateString: string): string {
  //   const date = new Date(dateString);
  //   console.log(date);
  //   return new Date(date.getTime() + 0 * 60 * 60 * 1000).toLocaleString(
  //     "ja-JP",
  //   );
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

  // return <pre>{JSON.stringify(tasks, null, 2)}</pre>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <LogoutButton />
        Hey, {user.email}!
      </div>

      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">タスク一覧</h1>
        <Link
          href="/tasks/new"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          新規タスク
        </Link>
      </div>

      {!tasks || tasks.length === 0 ? (
        <p className="text-sm text-gray-500">タスクがありません。</p>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
          {tasks.map((task) => {
            const isDone = task.status === "done";
            return (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <ToggleStatus defaultChecked={isDone} taskID={task.id} />

                  <div>
                    <Link
                      href={`/tasks/${task.id}`}
                      className={`font-medium ${
                        isDone ? "text-gray-400 line-through" : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </Link>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                      <TaskStatusBadge status={task.status} />
                      {task.due_date && <span>期限: {task.due_date}</span>}
                      <span>作成: {formatJST(task.created_at)}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
