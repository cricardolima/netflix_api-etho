import { Request } from "express";
import { User } from "../entities";

export interface CustomRequest extends Request {
    loggedUser?: User
}