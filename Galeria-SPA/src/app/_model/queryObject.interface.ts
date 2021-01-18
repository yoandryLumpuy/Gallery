export interface QueryObject{
    userId?: number;

    //sorting
    sortBy? : string;
    isSortAscending?: boolean;

    //pagination
    pageSize: number;        
    page: number;
}