import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsObject, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { SORT_DIRECTION } from "libs/shared/common.enum";

export class PriceRangeDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  min?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  max?: number;
}

export class SortDto {
  @IsOptional()
  @IsEnum(SORT_DIRECTION, { message: "Sort direction must be ASC or DESC" })
  direction?: SORT_DIRECTION;

  @IsOptional()
  @IsString()
  columnName?: string;
}

export class ProductFilterDto {

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceRangeDto)
  priceRange?: PriceRangeDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SortDto)
  sort?: SortDto
}
