export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "normal" | "high";
    isDone: boolean;
}