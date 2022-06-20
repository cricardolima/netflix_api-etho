import { UnauthorizedException } from "../exceptions/unauthorized.exception";
import { UserService } from "./user.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

    /**
     * @description Generate token for user
     * @param user: {email: string, password: string}
     * @returns {Promise<string>}
     * @memberof AuthService
     * 
     */
    private generateToken = (user: any) => {
        return jwt.sign({
            sub: user.id,
            iat: Date.now(),
            email: user.email,
        }, process.env.JWT_SECRET || "");
    }
    /**
     * @description Login user
     * @param email
     * @param password
     * @returns Token: string
     * @memberof AuthService
     * @throws {UnauthorizedException}
     *
     */
    async login(email: string, password: string): Promise<string> {
        const user = await new UserService().findOne(email);

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
            throw new UnauthorizedException("Invalid password");
        }

        const token = this.generateToken(user);

        return token;
    }
}