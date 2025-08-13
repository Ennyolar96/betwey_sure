import { PredictionService } from './prediction.service';
import { FilterPrediction } from './dto';
export declare class PredictionController {
    private readonly predictionService;
    constructor(predictionService: PredictionService);
    getPredictions(query: FilterPrediction): Promise<import("mongoose").PaginateResult<import("./model").PredictionDocument> | {
        docs: any[];
        hasNextPage: boolean;
        totalDocs?: undefined;
        page?: undefined;
        limit?: undefined;
        totalPages?: undefined;
    } | {
        docs: import("./interface").IPrediction[];
        totalDocs: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    }>;
}
