import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { findMany, PopulateOptions } from './global.interface';

export class FindMany implements findMany {
  @IsOptional()
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  @IsString({ each: true })
  search?: string[];

  @IsOptional()
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  @IsString({ each: true })
  sort?: string[] = ['updatedAt'];

  @IsOptional()
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  @IsString({ each: true })
  populate?: Array<string | PopulateOptions>;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform((v) => parseInt(v.value, 10))
  offset?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((v) => parseInt(v.value, 10))
  limit?: number = 20;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((v) => parseInt(v.value, 10))
  page?: number = 1;

  @IsOptional()
  @IsBoolean()
  @Transform((v) => (v.value === 'true' ? true : false))
  lean?: any = true;

  @IsOptional()
  @IsString({ each: true })
  @Transform((v) => (typeof v.value === 'string' ? [v.value] : v.value))
  select?: string[];
}
