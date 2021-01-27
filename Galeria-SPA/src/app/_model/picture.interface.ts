import { PointOfView } from './point-of-view.interface';
import { User } from './user.interface';
export interface Picture {
    id : number,
    name: string,
    ownerUser: User,
    uploadedDateTime: Date
    topPointsOfView : PointOfView[];
    youLikeIt : boolean;
    yourComment : PointOfView;
} 