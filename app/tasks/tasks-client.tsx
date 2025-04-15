"use client";

import { useState } from "react";
import Task from "@/components/task";
import { Task as TaskType } from "@/types/task";
import { createClient } from "@/utils/supabase/client";
import { Priority } from "@/types/priority";
import { User } from "@supabase/supabase-js";
import NewTask from "@/components/new-task";

export default function TasksClient(
    { initialTasks, initialPriotiries, user }: 
    { initialTasks: TaskType[], initialPriotiries: Partial<Priority>[], user: User }) 
{
  const supabase = createClient();

  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);

  async function createTask(title: string) {
    const { data } = await supabase.from("tasks").insert({ title, user_id: user!.id }).select("*");
    const newTask = data?.[0];
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTasks((prevTasks) => prevTasks.sort((a, b) => {
        if (a.done === b.done) return 0;
        return a.done ? 1 : -1;
      }));
    }
  }

  const onUpdateTask = async (id: string, updatedFields: Partial<TaskType>) => {
    await (supabase.from("tasks").update(updatedFields).eq("id", id));
    setTasks((prevTasks) => 
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, ...updatedFields };
        }
        return task;
      }).sort((a, b) => {
        if (a.done === b.done) return 0;
        return a.done ? 1 : -1;
      }));
  };

  async function deleteTask(id: string) {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="… justify-between flex flex-col gap-y-2">
      {tasks.length === 0 && <p className="text-center text-sm my-5">There are not pending tasks.</p>}

      {tasks.map((task) => (
        <Task key={task.id} task={task} updateTask={onUpdateTask} priorities={initialPriotiries} deleteTask={deleteTask} />
      ))}
      <div className="mt-auto">
        <NewTask createTask={createTask}></NewTask>
      </div>
    </main>
  );
}
