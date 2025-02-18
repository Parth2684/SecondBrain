import { JwtPayload } from "jsonwebtoken"

declare global {
    namespace Express{
        interface Request {
            userId: string | JwtPayload;
            email: string;
            firstName: string;
            lastName: string;
        }
    }
}