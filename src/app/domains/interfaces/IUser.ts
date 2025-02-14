import { RolUser } from "../enums/ERolUser";

export interface User {
    name: string,
    username: string;
    rol: RolUser;
    token: string;
}