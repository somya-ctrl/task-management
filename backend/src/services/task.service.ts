import { taskRepository } from "../repositories/task.repository";
import { TaskStatus,Priority } from "@prisma/client";

export const taskService ={
    async createTask(data:{
        title:string;
        description?:string;
        status?:TaskStatus;
        priority?:Priority;
        dueDate?:string;
        userId:string;
    }){
        return taskRepository.create(data);
    },
     async getTasks(filters: { status?: TaskStatus; page?: number; limit?: number; userId: string }) {
    return taskRepository.findMany(filters);
  },
};