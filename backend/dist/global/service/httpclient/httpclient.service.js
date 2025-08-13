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
var HttpClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClientService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let HttpClientService = HttpClientService_1 = class HttpClientService {
    constructor(httpService) {
        this.httpService = httpService;
        this.logger = new common_1.Logger(HttpClientService_1.name);
        this.fetchData = async (uri, header) => {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(uri, {
                headers: header,
            })
                .pipe((0, rxjs_1.retry)({
                count: 3,
                delay: (error, retryCount) => {
                    this.logger.warn(`Retrying request... attempt #${retryCount} after error: ${error.message}`);
                    return new Promise((res) => setTimeout(res, retryCount * 2000));
                },
            }), (0, rxjs_1.catchError)((error) => {
                this.logger.error(error.response.data);
                throw 'An error happened!';
            })));
            return data;
        };
    }
};
exports.HttpClientService = HttpClientService;
exports.HttpClientService = HttpClientService = HttpClientService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], HttpClientService);
//# sourceMappingURL=httpclient.service.js.map