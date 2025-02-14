import { RolUser } from "../../domains/enums/ERolUser";

export interface UserCredentials {
    username:string;
    password: string;
}

export interface UserData {
    username: string,
    user: string,
    rol: RolUser
}