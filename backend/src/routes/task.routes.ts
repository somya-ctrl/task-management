import { Router } from "express";
import { taskController } from "../controllers/task.controller";
import { validate, validateQuery } from "../middleware/validate.middleware";
import { createTaskSchema, updateTaskSchema, taskQuerySchema } from "../validators/task.validator";

const router = Router();
router.post("/", validate(createTaskSchema), taskController.create);
router.get("/", validateQuery(taskQuerySchema), taskController.getAll);
export default router;
