//"use client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export function ToggleStatus({
  defaultChecked,
  taskID,
}: {
  defaultChecked: boolean;
  taskID: string;
}) {
  async function CheckAction() {
    "use server";
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase
      .from("tasks")
      .update({
        status: defaultChecked ? "todo" : "done",
      })
      .eq("id", taskID)
      .eq("email", user.email);
    redirect("/tasks");
  }
  return (
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600"
      onChange={CheckAction}
    />
  );
}
