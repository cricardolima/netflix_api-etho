import { HTTP_STATUS } from "../enums/http-status.enum";
import HttpException from "./http.exception";

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, HTTP_STATUS.UNAUTHORIZED);
    }
}