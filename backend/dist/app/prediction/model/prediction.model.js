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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictionSchema = exports.PredictionModel = void 0;
const common_1 = require("../../../global/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
let PredictionModel = class PredictionModel {
};
exports.PredictionModel = PredictionModel;
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PredictionModel.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, index: 1 }),
    __metadata("design:type", Date)
], PredictionModel.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PredictionModel.prototype, "home_goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PredictionModel.prototype, "away_goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PredictionModel.prototype, "homeID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, index: 1 }),
    __metadata("design:type", String)
], PredictionModel.prototype, "homeTeam", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "homeLogo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], PredictionModel.prototype, "awayID", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, index: 1 }),
    __metadata("design:type", String)
], PredictionModel.prototype, "awayTeam", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "awayLogo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, index: 1 }),
    __metadata("design:type", String)
], PredictionModel.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "countryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, index: 1 }),
    __metadata("design:type", String)
], PredictionModel.prototype, "competition", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "competition_full", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, index: 1 }),
    __metadata("design:type", String)
], PredictionModel.prototype, "home_win", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "away_win", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "1x2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "draw", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "both_teams", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "both_teams_to_score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "over15goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "over25goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "over35goals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "correctscore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "homeform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "awayform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "home_win_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "away_win_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "draw_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "1x_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "12_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "2x_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "bttshomeform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "bttsawayform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "btts_yes_odds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], PredictionModel.prototype, "btts_no_odds", void 0);
exports.PredictionModel = PredictionModel = __decorate([
    (0, mongoose_1.Schema)({ collection: common_1.COLLECTIONS.predict, timestamps: true })
], PredictionModel);
exports.PredictionSchema = mongoose_1.SchemaFactory.createForClass(PredictionModel);
exports.PredictionSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=prediction.model.js.map