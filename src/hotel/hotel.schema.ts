import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Hotel {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true, default: 0 })
  views: number;

  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
  //   author: User;

  //   @Prop({
  //     type: [mongoose.Schema.Types.ObjectId],
  //     ref: 'BlogCategory',
  //     index: true,
  //   })
  //   categories: BlogCategory[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);

// HotelSchema.virtual('categoriesDetail', {
//   ref: 'BlogCategory',
//   localField: 'categories',
//   foreignField: '_id',
// });

// HotelSchema.virtual('authorDetail', {
//   ref: 'User',
//   localField: 'author',
//   foreignField: '_id',
//   justOne: true,
// });

HotelSchema.index({
  title: 'text',
  slug: 'text',
});
