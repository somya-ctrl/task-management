import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/task.service";
import { sendSuccess, sendError } from "../utils/response";
import { TaskStatus } from "@prisma/client";

export const taskController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await taskService.createTask({ ...req.body, userId: req.user.id });
      sendSuccess(res, task, 201);
    } catch (err) { next(err); }
  },
    async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, page, limit } = req.query as { status?: TaskStatus; page?: number; limit?: number };
      const result = await taskService.getTasks({ status, page, limit, userId: req.user.id });
      sendSuccess(res, result);
    } catch (err) { next(err); }
  },
};