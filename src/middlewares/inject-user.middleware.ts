import { NextFunction, Request, Response } from "express";
import { CustomResponse } from "../interfaces/custom-response.interface";
import { CustomRequest } from "../interfaces/custom-request.interface";
import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { AppDataSource } from "../../configs/database/data-source";
import { User } from "../entities";
import jsonwebtoken from "jsonwebtoken";

export const injectUser = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
        throw new UnauthorizedException("Token is missing");
    }

    const userRepository = AppDataSource.getRepository(User)
    const secret = process.env.JWT_SECRET || "";
    const payload = jsonwebtoken.verify(token, secret);

    if (!payload.sub) {
        throw new UnauthorizedException("Invalid token");
    }

    const loggedUser = await userRepository.findOne({ where: { id: +payload.sub}});

    if (!loggedUser) {
        throw new UnauthorizedException("Invalid token");
    }

    req.loggedUser = loggedUser;

    next();
}