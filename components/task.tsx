"use client";

// Components
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Types
import { Task as TaskType } from "@/types/task";
import { Priority } from "@/types/priority";

export default function Task(
{
    task, 
    updateTask,
    priorities,
}: {
    task: TaskType;
    updateTask: (id: string, updatedTask: Partial<TaskType>) => void;
    priorities: Partial<Priority>[];
}) {

    return (
        <div className="w-full flex gap-2 items-center">
            {/* Checkbox and input */}
                <Checkbox id="task" className="" onToggle={(value) => console.log(value)} />
            <div className="w-8/12 flex gap-2 items-center">
                <Input className="border-0" placeholder="Task title" value={task.title} onChange={(e) => updateTask(task.id, { title: e.target.value })} />
            </div>

            {/* Priority and actions */}
            <div className="flex gap-2 items-center ml-auto">
            <Select value={task.priority_id} onValueChange={(value) => updateTask(task.id, { priority_id: value as TaskType["priority_id"] })}>
                <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    {priorities.map((priority) => (
                        <SelectItem key={priority.id} value={priority.id!}>
                            {priority.title}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            </div>
        </div>
    );
}