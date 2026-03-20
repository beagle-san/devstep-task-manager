"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import type { TaskInput } from "@/lib/validators";
import { updateTaskAction } from "@/components/actions";

type Props = {
  initialValues?: Partial<TaskInput>;
  submitLabel: string;
  id: string;
  // action: (values: TaskInput) => Promise<{ error?: string } | void>;
};

// export function TaskForm({ initialValues, submitLabel, action }: Props) {
export function TaskFormUpdate({ initialValues, submitLabel, id }: Props) {
  const [values, setValues] = useState<TaskInput>({
    title: initialValues?.title ?? "",
    detail: initialValues?.detail ?? "",
    due_date: initialValues?.due_date ?? "",
    status: initialValues?.status ?? "todo",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof TaskInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    //const handleSubmit = async (formData: FormData) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);
    setLoading(true);

    console.log("TaskForm");
    console.log(values);

    let redirect_to = "";
    try {
      const res = await updateTaskAction(id, values);
      if (res && "error" in res && res.error) {
        setFormError(res.error);
      } else {
        console.log("updateTaskAction() is succeed");
        redirect_to = "/tasks";
      }
    } catch (err) {
      setFormError("予期せぬエラーが発生しました");
    } finally {
      setLoading(false);
    }
    if (redirect_to !== "") {
      redirect(redirect_to);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {formError && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          タスクタイトル<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={values.title}
          onChange={handleChange("title")}
          maxLength={100}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          タスク詳細
        </label>
        <textarea
          value={values.detail ?? ""}
          onChange={handleChange("detail")}
          maxLength={500}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          期限日
        </label>
        <input
          type="date"
          value={values.due_date ?? ""}
          onChange={handleChange("due_date")}
          className="mt-1 block w-fit rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "保存中..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
