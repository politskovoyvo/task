export interface InviteUserMessage {
    userId: string;
    company: {
        id: number;
        name: string;
    };
    message: string;
    dt: string;
}
