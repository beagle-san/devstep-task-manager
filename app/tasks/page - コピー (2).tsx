import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Task = {
  id: string;
  title: string;
  status: "todo" | "done";
  due_date: string | null;
  created_at: string;
};

export default async function TaskListPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, status, due_date, created_at")
    .eq("email", user.email)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
                  {/* 完了/未完了切り替え（簡易版） */}
                  <form
                    action={async () => {
                      "use server";
                      const supabase = await createClient();
                      const {
                        data: { user },
                      } = await supabase.auth.getUser();
                      if (!user) return;
                      await supabase
                        .from("tasks")
                        .update({
                          status: isDone ? "todo" : "done",
                        })
                        .eq("id", task.id)
                        .eq("email", user.email);
                    }}
                  >
                    <input
                      type="checkbox"
                      defaultChecked={isDone}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                      onChange={() => {}}
                    />
                  </form>

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
                      <span>
                        作成:{" "}
                        {new Date(task.created_at).toLocaleString("ja-JP")}
                      </span>
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
