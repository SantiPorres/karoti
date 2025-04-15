import Task from "@/components/task";
import { Task as TaskType } from "@/types/task";
import { useState } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TasksClient from '@/app/tasks/tasks-client';
import { Priority } from "@/types/priority";

export default async function Tasks() {
  const supabase = await createClient();

  const {
      data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
      return redirect("/sign-in");
  }

  const priorities: Partial<Priority>[] = (await supabase.from("priorities").select("id,title")).data ?? [];
  const tasks : TaskType[] = (await supabase.from("tasks").select("*").order('done', {ascending: true})).data ?? [];

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-y-2">
        <h1 className="w-full font-bold ">Tasks:</h1>
        <TasksClient user={user} initialTasks={tasks} initialPriotiries={priorities} />
      </div>
    </main>
  );
}
