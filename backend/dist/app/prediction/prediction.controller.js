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
exports.PredictionController = void 0;
const common_1 = require("@nestjs/common");
const prediction_service_1 = require("./prediction.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
let PredictionController = class PredictionController {
    constructor(predictionService) {
        this.predictionService = predictionService;
    }
    async getPredictions(query) {
        return this.predictionService.fetchPrediction(query);
    }
};
exports.PredictionController = PredictionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Filter prediction with data' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterPrediction]),
    __metadata("design:returntype", Promise)
], PredictionController.prototype, "getPredictions", null);
exports.PredictionController = PredictionController = __decorate([
    (0, common_1.Controller)('predictions'),
    (0, swagger_1.ApiTags)('PREDICTIONS'),
    __metadata("design:paramtypes", [prediction_service_1.PredictionService])
], PredictionController);
//# sourceMappingURL=prediction.controller.js.map