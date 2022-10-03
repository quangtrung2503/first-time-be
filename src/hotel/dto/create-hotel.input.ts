import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateHotelDto {
  @ApiProperty({})
  @IsString()
  readonly name: string;
  @IsString()
  readonly slug: string;
  @IsString()
  readonly description: string;
  @ApiProperty({
    example: 'uploads/2022/01/01/pepe.png',
  })
  @IsString()
  readonly thumbnail: string;
  @IsNumberString()
  readonly views: string;
}
