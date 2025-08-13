import { Controller, Get, Query } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { FilterPrediction } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('predictions')
@ApiTags('PREDICTIONS')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  @ApiOperation({ summary: 'Filter prediction with data' })
  async getPredictions(@Query() query: FilterPrediction) {
    return this.predictionService.fetchPrediction(query);
  }
}
