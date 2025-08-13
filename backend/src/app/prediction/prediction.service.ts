import { COLLECTIONS } from '@app/common';
import { findManyWrapper } from '@app/helper';
import { HttpClientService } from '@app/service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { FilterQuery, PaginateModel, Types } from 'mongoose';
import { filterPrediction, IPrediction, response } from './interface';
import { PredictionDocument } from './model';
import { retry } from 'rxjs';

@Injectable()
export class PredictionService {
  /**
   * Threshold value for home team win probability (in percentage)
   * Predictions below this value will be filtered out
   */
  private readonly HOME_WIN_THRESHOLD = 50;

  constructor(
    @InjectModel(COLLECTIONS.predict)
    private readonly predictModel: PaginateModel<PredictionDocument>,
    private readonly client: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Fetches football match predictions either from cache (database) or external API
   *
   * @param {filterPrediction} query - Filter criteria including date, pagination, and search terms
   * @returns {Promise<PaginateResult<PredictionDocument>>} Paginated list of predictions
   * @throws {BadRequestException} If the date format is invalid
   * @throws {Error} If there's an issue fetching data from either database or API
   *
   * @example
   * // Get predictions for a specific date
   * await service.fetchPrediction({
   *   date: new Date('2025-08-10'),
   *   page: 0,
   *   limit: 10,
   *   search: string
   * });
   */
  public async fetchPrediction(query: filterPrediction) {
    const date = query.date.toISOString().split('T')[0];
    if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) {
      throw new BadRequestException('Invalid date format. Use YYYY-MM-DD.');
    }

    // First try to get cached results from database
    const dbResponse = await findManyWrapper<PredictionDocument>(
      this.predictModel,
      this.filter(query),
      query,
    );

    if (dbResponse.docs.length > 0) {
      return dbResponse;
    } else if (query.search.length > 0) {
      // Database response was return here because if non of the search character matches it will fall back
      // to Api which may be data that already be fetch before. so in this case search only work for database
      // and it wont filter by date but by home_win
      return dbResponse;
    }

    // If no cached results, fetch from external API
    const apiUrl = `https://betminer.p.rapidapi.com/bm/predictions/list/${date}/${date}`;
    const apiData = await this.client.fetchData<IPrediction[]>(apiUrl, {
      'x-rapidapi-key': this.configService.getOrThrow('X_RAPID_API_KEY'),
      'x-rapidapi-host': this.configService.getOrThrow('X_RAPID_API_HOST'),
    });

    if (!Array.isArray(apiData)) {
      return { docs: [], hasNextPage: false };
    }

    // Filter results to only include matches where home team has >50% win chance
    const filteredData = apiData.filter((match) => {
      return parseInt(match.home_win, 10) > this.HOME_WIN_THRESHOLD;
    });

    // Cache the filtered results
    if (apiData.length > 0) {
      await this.predictModel.insertMany(apiData);
    }

    // Return paginated results
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

  /**
   * Builds a MongoDB filter query based on the provided criteria
   *
   * @param {filterPrediction} query - Filter criteria including search terms and date
   * @returns {FilterQuery<IPrediction>} MongoDB filter query object
   *
   * @private
   *
   * @example
   * // Returns a filter for matches where home team win chance > 50%
   * // and optionally matches search terms
   * this.filter({
   *   search: ['Premier League'],
   *   date: new Date('2023-10-15')
   * });
   */
  private filter(query: filterPrediction): FilterQuery<IPrediction> {
    const where: FilterQuery<IPrediction> = {};

    if (query.search) {
      where.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          where.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
          const regx = new RegExp(searchTerm, 'i');
          where.$or.push(
            { awayTeam: regx },
            { homeTeam: regx },
            { competition: regx },
            { competition_full: regx },
            { country: regx },
          );
        }
      });
    }

    if (query.date) {
      if (query.search.join('').trim() === '') {
        where['date'] = { $in: query.date };
      }
    }

    // Always filter for home win probability > threshold
    where.$expr = {
      $gt: [{ $toDouble: '$home_win' }, this.HOME_WIN_THRESHOLD],
    };
    return where;
  }
}
