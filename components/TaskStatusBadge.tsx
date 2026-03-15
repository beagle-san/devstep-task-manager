"use client";

import clsx from "clsx";

type Props = {
  status: "todo" | "done";
};

export function TaskStatusBadge({ status }: Props) {
  const isDone = status === "done";
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        isDone
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800",
      )}
    >
      {isDone ? "完了" : "未完了"}
    </span>
  );
}
