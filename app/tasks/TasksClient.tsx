"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Task from "@/components/task";
import { Task as TaskType } from "@/types/task";
import { createClient } from "@/utils/supabase/client";
import { Priority } from "@/types/priority";

export default function TasksClient(
    { initialTasks, initialPriotiries }: 
    { initialTasks: TaskType[], initialPriotiries: Partial<Priority>[] }) 
{
  const supabase = createClient();

  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const router = useRouter();

  const onUpdateTask = async (id: string, updatedFields: Partial<TaskType>) => {
    
    await (supabase.from("tasks").update(updatedFields).eq("id", id));
    
    setTasks((prevTasks) => 
        prevTasks.map((task) => {
            if (task.id === id) {
                return { ...task, ...updatedFields };
            }
            return task;
        }));
  };

  return (
    <main className="…">
      {tasks.map((task) => (
        <Task key={task.id} task={task} updateTask={onUpdateTask} priorities={initialPriotiries} />
      ))}
    </main>
  );
}
