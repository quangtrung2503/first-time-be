import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as slug from 'slug';
import { CreateHotelDto } from './dto/create-hotel.input';
import { HotelService } from './hotel.service';

@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // @ApiBearerAuth()
  // @Roles(
  //   UserType.CUSTOMER_SUPPORT,
  //   UserType.ACCOUNTANT,
  //   UserType.ADMIN,
  //   UserType.SUPER_ADMIN,
  // )
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req, @Body() createHotelDto: CreateHotelDto) {
    const requireFields = ['name', 'description', 'thumbnail', 'views'];
    for (let i = 0; i < requireFields.length; i++) {
      const field = requireFields[i];
      if (!createHotelDto[field] || !createHotelDto[field].trim()) {
        throw new HttpException(
          `Field ${field} is required!`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const hotelSlug = slug(createHotelDto.slug.trim());
    const blogFound = await this.hotelService.findBySlug(hotelSlug);

    if (blogFound && blogFound._id) {
      throw new HttpException(
        'Hotel name already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.hotelService.create({
      ...createHotelDto,
      name: createHotelDto.name.trim(),
      slug: hotelSlug,
    });
  }
}
