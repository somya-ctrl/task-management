import { prisma } from "../config/db";
import { TaskStatus, Priority } from "@prisma/client";

export const taskRepository = {
  async create(data: {
    title: string;
    description?: string;
    status?: TaskStatus;
    priority?: Priority;
    dueDate?: string;
    userId: string;
  }) {
    return prisma.task.create({
      data: { ...data, dueDate: data.dueDate ? new Date(data.dueDate) : undefined },
    });
  },

  async findMany(filters: { status?: TaskStatus; page?: number; limit?: number; userId: string }) {
    const { status, page = 1, limit = 10, userId } = filters;
    const skip = (page - 1) * limit;
    const where = { userId, ...(status && { status }) };

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.task.count({ where }),
    ]);

    return { tasks, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

 
};
