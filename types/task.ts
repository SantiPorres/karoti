export interface Task {
    id: string;
    created_at: Date;
    last_updated_at: Date;
    title: string;
    date: Date;
    done: boolean;
    deadline?: Date;
    parent_id?: string;
    user_id: string;
    priority_id: string;
}