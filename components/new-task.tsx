"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewTask({
    createTask
}: {
    createTask: (title: string) => Promise<void>;
}) {
    let loading = false;
    const [titleInput, setTitleInput] = useState("");

    async function create(title: string) {
        if (title === "") return;
        try {
            loading = true;
            await createTask(title);
            setTitleInput("");
        } finally {
            loading = false;
        }
    }

    return (
        <div className="w-full flex gap-2 md:px-4">
            <Input className={`border-0 focus-visible:border-b focus-visible:border-b-white focus-visible:ring-0 rounded-none w-full`}  placeholder="New task title" value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
        
            <Button type="button" disabled={loading} onClick={() => create(titleInput)} className="w-1/4 md:w-1/12 gap-2 flex">
                <span>Add</span>
                <svg data-testid="geist-icon" height="14" strokeLinejoin="round" viewBox="0 0 16 16" width="14" style={{color: "currentcolor"}}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M 8.75,1 H7.25 V7.25 H1.5 V8.75 H7.25 V15 H8.75 V8.75 H14.5 V7.25 H8.75 V1.75 Z" fill="currentColor">
                    </path>
                </svg>
            </Button>
        </div>
    )
}