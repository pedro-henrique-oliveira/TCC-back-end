import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

export function authentication( request: Request, response: Response, next: NextFunction) {
    try {
    const authHeader = request.headers.authorization;

    if (!authHeader){
        return response.status(401).json({ error: "não autenticado" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return response.status(401).json({ error: "não autenticado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!request.body) {
    request.body = {};
    }

    next();
} catch (e) {        
    console.error(e);
    return response.status(401).json({ error: "não autenticado" });
    }
}
