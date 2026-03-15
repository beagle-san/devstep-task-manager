"use client";

export function DeleteButton({ action }: { action: () => Promise<void> }) {
  return (
    <button
      type="button"
      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      onClick={async () => {
        if (confirm("本当に削除しますか？")) {
          await action();
        }
      }}
    >
      削除
    </button>
  );
}
