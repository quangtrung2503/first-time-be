import { Injectable } from '@nestjs/common';
import { Hotel, HotelDocument } from './hotel.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHotelDto } from './dto/create-hotel.input';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
  ) {}

  filterTransform(filter: any) {
    const _filter = {};

    if (filter && Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter[key]) {
          _filter[key] = filter[key];
        }
      }
    }

    return _filter;
  }

  async findBySlug(slug: string): Promise<Hotel> {
    const docFound = await this.hotelModel.findOne({ slug });
    return (docFound && docFound.toObject()) || null;
  }

  //! FILTER
  async findAll(filter?: any): Promise<Hotel[]> {
    return this.hotelModel
      .find({ ...this.filterTransform(filter) })
      .populate('authorDetail', {
        username: 1,
        email: 1,
        fullname: 1,
      })
      .populate('categoriesDetail');
  }
  //! CREATE
  async create(createBlogDto: CreateHotelDto): Promise<Hotel> {
    const createdDoc = await this.hotelModel.create(createBlogDto);
    return (createdDoc && createdDoc.toObject()) || null;
  }
}
