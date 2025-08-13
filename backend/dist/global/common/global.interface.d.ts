export interface PopulateOptions {
    path: string;
    select?: any;
    match?: any;
    perDocumentLimit?: number;
    strictPopulate?: boolean;
}
export interface findMany {
    search?: string[];
    sort?: string[];
    populate?: Array<string | PopulateOptions>;
    offset?: number;
    limit?: number;
    page?: number;
    lean?: any;
    select?: string[];
}
