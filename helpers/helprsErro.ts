import type { Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import prismaErrorCodes from "../config/prismaErrorCodes.json" with { type: "json" };

export function handleError(e: any, response: Response) {
    console.error(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // @ts-ignore
        return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
    }
    return response.status(500).json("Unknown error. Try again later");
}