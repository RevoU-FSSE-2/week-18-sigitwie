import UserDAO from "../dao/UserDAO";
import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import sequelize from "../services/db";

type UserType = {
  id: string;
  username: string;
  email: string;
  password?: string;
  roleId: string;
};

const userDAO = new UserDAO(sequelize);

export async function register(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>> | void> {
  try {
    let { username, password, email, roleId } = req.body;

    if (!roleId) {
      roleId = "2";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUserByEmail = await userDAO.getByEmail(email);
    const existingUserByUsername = await userDAO.getByUsername(username);
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const isAlphanumeric = /^[a-zA-Z0-9]+$/;
    if (
      password.length < 8 ||
      !isAlphanumeric.test(password) ||
      password.includes(" ")
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, alphanumeric, and must not contain spaces",
      });
    }

    const hashedPassword = await AuthService.hashPassword(password);
    const newUser = await userDAO.createUser({
      username,
      email,
      password: hashedPassword,
      roleId,
    });

    await AuthService.issueTokensAndSetCookies(res, newUser);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await userDAO.getByEmail(email);

    if (user && (await AuthService.comparePassword(password, user.password))) {
      const tokenPayload = { 
        userId: user.id, 
        username: user.username, 
        roleId: user.roleId 
      };
      
      const token = AuthService.generateToken(tokenPayload);
      AuthService.setTokenToCookies(res, token);

      res.status(200).json({
        message: "Logged in successfully",
        username: user.username,
        userId: user.id,
        roleId: user.roleId,  // Send roleId as part of the response
        auth_token: token,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}


export async function logout(req: Request, res: Response): Promise<void> {
  try {
    res.clearCookie("auth_token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const user = await userDAO.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userDAO.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    await userDAO.deleteById(id);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}

