import { HttpClientService } from '../../global/service';
import { ConfigService } from '@nestjs/config';
import { PaginateModel } from 'mongoose';
import { filterPrediction, IPrediction } from './interface';
import { PredictionDocument } from './model';
export declare class PredictionService {
    private readonly predictModel;
    private readonly client;
    private readonly configService;
    private readonly HOME_WIN_THRESHOLD;
    constructor(predictModel: PaginateModel<PredictionDocument>, client: HttpClientService, configService: ConfigService);
    fetchPrediction(query: filterPrediction): Promise<import("mongoose").PaginateResult<PredictionDocument> | {
        docs: any[];
        hasNextPage: boolean;
        totalDocs?: undefined;
        page?: undefined;
        limit?: undefined;
        totalPages?: undefined;
    } | {
        docs: IPrediction[];
        totalDocs: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    }>;
    private filter;
}
