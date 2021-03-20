export interface User {
    id: number;
    name: string;
    refreshToken: string;
    accessToken: string;
    avatar: string;

    permissions?: number[];
}
