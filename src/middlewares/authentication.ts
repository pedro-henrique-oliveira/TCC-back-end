import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { funcionarios } from "../../generated/prisma/client";

export function authentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.status(401).json("Não autenticado");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return response.status(401).json("Não autenticado");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    );

    if (!request.body) {
      request.body = {};
    }

    request.body.user = decoded as funcionarios;

    next();
  } catch (error) {
    console.error(error);

    return response.status(401).json("Não autenticado");
  }
}