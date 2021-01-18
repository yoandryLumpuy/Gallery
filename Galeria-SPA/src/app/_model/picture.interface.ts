import { User } from './user.interface';
export interface Picture {
    id : number,
    name: string,
    ownerUser: User,
    uploadedDateTime: Date
} 