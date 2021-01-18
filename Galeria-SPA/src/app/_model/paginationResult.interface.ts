import { Picture } from './picture.interface';

export interface PaginationResult<T>{
    totalItems: number;
    page : number;
    pageSize : number;
    totalPages : number;
    items : Array<T>
}