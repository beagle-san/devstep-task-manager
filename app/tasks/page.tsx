import { Suspense } from "react";
import TaskList from "./task-list";
import Loading from "./loading";

export default function TaskListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TaskList />
    </Suspense>
  );
}
