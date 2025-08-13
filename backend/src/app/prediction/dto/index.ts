import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { filterPrediction } from '../interface';
import { FindMany } from '@app/common';

export class FilterPrediction extends FindMany implements filterPrediction {
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date;
}
