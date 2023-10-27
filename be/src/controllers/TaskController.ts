import { Request, Response } from "express";
import TaskDAO from "../dao/TaskDAO";
import User from "../models/User";

interface ExtendedRequest extends Request {
  user?: {
    userId: string;
    username: string;
    roleId: string;
  };
}

export async function createTask(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const {
      assignee,
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    const user = await User.findOne({ where: { username: assignee } });

    if (!user) {
      return res.status(400).json({ message: "Username not found." });
    }

    const userId = user.id;

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
      assignedTo: userId,
    };

    const task = await TaskDAO.createTask(taskData);
    return res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function getTaskById(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const id = req.params.id;
    const task = await TaskDAO.getTaskById(id);
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function getAllTasksForUser(
  req: ExtendedRequest,
  res: Response
): Promise<Response> {
  try {
    if (!req.user || !req.user.userId) {
      return res
        .status(403)
        .json({ message: "Authentication failed. User ID is missing." });
    }

    const userId = req.user.userId;
    const tasks = await TaskDAO.getAllTasksForUser(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function updateTask(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const id = req.params.id;

    // Extract data from the request body
    const {
      assignee,
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    // If assignee is provided, find the corresponding user
    let userId;
    if (assignee) {
      const user = await User.findOne({ where: { username: assignee } });
      if (!user) {
        return res.status(400).json({ message: "Username not found." });
      }
      userId = user.id;
    }

    // Prepare update data
    const updateData: any = {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    };

    if (userId) {
      updateData.assignedTo = userId;
    }

    const result = await TaskDAO.updateTask(id, updateData);

    if (result[0] > 0) {
      // number of affected rows
      return res.status(200).json({ message: "Task updated successfully" });
    } else {
      return res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}

export async function deleteTask(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const id = req.params.id;
    await TaskDAO.deleteTask(id);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
}
