import { findMany, PopulateOptions } from './global.interface';
export declare class FindMany implements findMany {
    search?: string[];
    sort?: string[];
    populate?: Array<string | PopulateOptions>;
    offset?: number;
    limit?: number;
    page?: number;
    lean?: any;
    select?: string[];
}
