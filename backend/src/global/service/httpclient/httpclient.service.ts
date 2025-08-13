import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, retry } from 'rxjs';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);
  constructor(private readonly httpService: HttpService) {}

  public fetchData = async <T extends object | object[]>(
    uri: string,
    header?: Record<string, string>,
  ) => {
    const { data } = await firstValueFrom(
      this.httpService
        .get<T>(uri, {
          headers: header,
        })
        .pipe(
          retry({
            count: 3,
            delay: (error, retryCount) => {
              this.logger.warn(
                `Retrying request... attempt #${retryCount} after error: ${error.message}`,
              );
              return new Promise((res) => setTimeout(res, retryCount * 2000));
            },
          }),
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  };
}
