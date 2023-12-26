import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const tagsSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
  },
});

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [tagsSchema],
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    durationInWeeks: {
      type: Number,
      required: true
    },
    details: {
      type: detailsSchema,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);


export const Course = model<TCourse>('Course', courseSchema);
