// Create an [enum] for `roles`
export enum Role {
    Leader = 'leader',
    AssistLeader = 'assist_lead',
    Instructor = 'instructor',
    Assistant = 'assistant',
    Novice = 'novice',
}

//  User name interface
interface Name {
    first: string;
    last: string;
}

// Define core interface for user
export interface UserInterface {
    name: Name;
    email;
    mobile_phone;
    fullName?;
    _id?;
    role?;
    nickname?;
    password?;
}

// Just read props from `user` model.
export type StaticUser = Readonly<UserInterface>;

// Define user model
export class User implements UserInterface {
    constructor(
        public _id: string,
        public name: Name,
        public email: string,
        public mobile_phone: string,
        public role?: Role,
        public password?: string) { }
}
