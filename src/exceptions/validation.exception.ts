import { BadRequestException } from "./bad-request.exception";

export class ValidationException extends BadRequestException {
    details?: string[];
    constructor(message: string, details?: string[]) {
        super(message);
        this.details = details;
    }
}
