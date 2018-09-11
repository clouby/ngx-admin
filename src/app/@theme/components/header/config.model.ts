interface User {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    nickname?: string;
}

export type StaticUser = Readonly<User>;
