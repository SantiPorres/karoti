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
import { useState } from "react";

export default function Task(
{
    task, 
    updateTask,
    priorities,
    deleteTask
}: {
    task: TaskType;
    updateTask: (id: string, updatedTask: Partial<TaskType>) => void;
    priorities: Partial<Priority>[];
    deleteTask: (id: string) => void;
}) {

    const [titleInput, setTitleInput] = useState(task.title);

    function onChangeTitle() {
        updateTask(task.id, { title: titleInput });
    }

    function onDiscard() {
        setTitleInput(task.title);
    }

    function onDelete() {
        deleteTask(task.id);
    }

    return (
        <div className="w-full flex flex-wrap gap-1 items-center border-b py-4">
            <div className="w-full flex gap-2 md:w-10/12 items-center">
                {/* Checkbox and input */}
                <Checkbox id="task" className="" checked={task.done} onCheckedChange={(value: boolean) => updateTask(task.id, { done: value })} />
                <Input disabled={task.done} className={`border-0 focus-visible:border-b focus-visible:ring-0 rounded-none w-full  ${task.done ? 'line-through' : ''}`}  placeholder="Task title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                <div className="flex gap-4 ml-3">
                {titleInput !== task.title ? 
                    <div className="flex gap-2">
                        <button type="button" onClick={onChangeTitle}>
                            <svg data-testid="geist-icon" height="16" strokeLinejoin="round" style={{color: "currentcolor"}} viewBox="0 0 16 16" width="16">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.5607 3.99999L15.0303 4.53032L6.23744 13.3232C5.55403 14.0066 4.44599 14.0066 3.76257 13.3232L4.2929 12.7929L3.76257 13.3232L0.969676 10.5303L0.439346 9.99999L1.50001 8.93933L2.03034 9.46966L4.82323 12.2626C4.92086 12.3602 5.07915 12.3602 5.17678 12.2626L13.9697 3.46966L14.5 2.93933L15.5607 3.99999Z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                        <button type="button" onClick={onDiscard}>
                        <svg data-testid="geist-icon" height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16" style={{color: "currentcolor"}}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z" fill="currentColor">
                            </path>
                        </svg>
                        </button>
                    </div> : null}
                    <button type="button" onClick={onDelete}>
                        <svg data-testid="geist-icon" height="16" strokeLinejoin="round" style={{color: "currentcolor"}} viewBox="0 0 16 16" width="16">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z" fill="currentColor">
                            </path>
                        </svg>
                    </button>
                </div>
                
                
            </div>

            {/* Priority and actions */}
            <div className="flex gap-2 items-center ml-auto">
                
                <Select value={task.priority_id} disabled={task.done} onValueChange={(value) => updateTask(task.id, { priority_id: value as TaskType["priority_id"] })}>
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