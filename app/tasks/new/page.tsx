import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaskFormCreate } from "@/components/TaskFormCreate";

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
      <TaskFormCreate submitLabel="保存" />
    </div>
  );
}
