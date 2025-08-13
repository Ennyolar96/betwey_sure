import { HttpService } from '@nestjs/axios';
export declare class HttpClientService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    fetchData: <T extends object | object[]>(uri: string, header?: Record<string, string>) => Promise<T>;
}
