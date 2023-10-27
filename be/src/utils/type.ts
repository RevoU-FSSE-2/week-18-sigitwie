export interface ExtendedRequest extends Request {
    user?: {
        userId: string;
        username: string;
        roleId: string;
    };
}