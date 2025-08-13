"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionService = void 0;
const common_1 = require("../../global/common");
const helper_1 = require("../../global/helper");
const service_1 = require("../../global/service");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PredictionService = class PredictionService {
    constructor(predictModel, client, configService) {
        this.predictModel = predictModel;
        this.client = client;
        this.configService = configService;
        this.HOME_WIN_THRESHOLD = 50;
    }
    async fetchPrediction(query) {
        const date = query.date.toISOString().split('T')[0];
        const dbResponse = await (0, helper_1.findManyWrapper)(this.predictModel, this.filter(query), query);
        if (dbResponse.docs.length > 0) {
            return dbResponse;
        }
        else if (query.search.length > 0) {
            return dbResponse;
        }
        const apiUrl = `https://betminer.p.rapidapi.com/bm/predictions/list/${date}/${date}`;
        const apiData = await this.client.fetchData(apiUrl, {
            'x-rapidapi-key': this.configService.getOrThrow('X_RAPID_API_KEY'),
            'x-rapidapi-host': this.configService.getOrThrow('X_RAPID_API_HOST'),
        });
        if (!Array.isArray(apiData)) {
            return { docs: [], hasNextPage: false };
        }
        const filteredData = apiData.filter((match) => {
            return parseInt(match.home_win, 10) > this.HOME_WIN_THRESHOLD;
        });
        if (apiData.length > 0) {
            await this.predictModel.insertMany(apiData);
        }
        const paginated = filteredData.slice(0, query.limit);
        const totalPages = Math.ceil(filteredData.length / query.limit);
        const hasNextPage = query.page < totalPages - 1;
        return {
            docs: paginated,
            totalDocs: filteredData.length,
            page: query.page,
            limit: query.limit,
            totalPages: totalPages,
            hasNextPage: hasNextPage,
        };
    }
    filter(query) {
        const where = {};
        if (query.search) {
            where.$or = [];
            query.search.forEach((searchTerm) => {
                if (mongoose_2.Types.ObjectId.isValid(searchTerm)) {
                    where.$or.push({ _id: new mongoose_2.Types.ObjectId(searchTerm) });
                }
                else {
                    const regx = new RegExp(searchTerm, 'i');
                    where.$or.push({ awayTeam: regx }, { homeTeam: regx }, { competition: regx }, { competition_full: regx }, { country: regx });
                }
            });
        }
        if (query.date) {
            if (query.search.join('').trim() === '') {
                where['date'] = { $in: query.date };
            }
        }
        where.$expr = {
            $gt: [{ $toDouble: '$home_win' }, this.HOME_WIN_THRESHOLD],
        };
        return where;
    }
};
exports.PredictionService = PredictionService;
exports.PredictionService = PredictionService = __decorate([
    (0, common_2.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(common_1.COLLECTIONS.predict)),
    __metadata("design:paramtypes", [Object, service_1.HttpClientService,
        config_1.ConfigService])
], PredictionService);
//# sourceMappingURL=prediction.service.js.map