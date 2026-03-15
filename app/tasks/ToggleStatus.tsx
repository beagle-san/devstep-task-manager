"use client";

export function ToggleStatus({
  defaultChecked,
  action,
}: {
  defaultChecked: boolean;
  action: () => Promise<void>;
}) {
  return (
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      className="h-4 w-4 rounded border-gray-300 text-indigo-600"
      onChange={() => action()}
    />
  );
}
