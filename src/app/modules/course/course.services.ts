/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import mongoose from 'mongoose';
import { Review } from '../review/review.model';

// Create course
const createCourseIntoDB = async (payload: TCourse) => {
  const startDate = new Date(payload.startDate as string);
  const endDate = new Date(payload.endDate as string);

  // Calculate the difference in milliseconds
  const durationInMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to weeks
  const weeks = Math.floor(durationInMs / (7 * 24 * 60 * 60 * 1000));
  payload.durationInWeeks = weeks;

  const result = await Course.create(payload);

  return result;
};

// Get all course with filter and paginate options
const getAllCourseFromDB = async (query: any) => {
  const filter: any = {};

  // filter based on minimum price
  if (query?.minPrice && !isNaN(Number(query?.minPrice))) {
    filter.price = { $gte: Number(query?.minPrice) };
  }

  // filter based on maximum price
  if (query?.maxPrice && !isNaN(Number(query?.maxPrice))) {
    filter.price = { ...filter.price, $lte: Number(query?.maxPrice) };
  }
 
  // Filter based on tags name
  if (query?.tags) {
    const tagName = query?.tags.split(',').map((tag: string) => tag.trim());

    filter.tags = { $elemMatch: { name: { $in: tagName }, isDeleted: false } };
  }

  // Filter based on start date and end date
  if (query?.startDate && query?.endDate) {
    filter.startDate = { $gte: query?.startDate };
    filter.endDate = { $lte: query?.endDate };
  } else if (query?.startDate) {
    filter.startDate = { $gte: query?.startDate };
  } else if (query?.endDate) {
    filter.endDate = { $lte: query?.endDate };
  }

  // filter on language
  if (query?.language) {
    filter.language = query?.language;
  }

  // filter on provider
  if (query?.provider) {
    filter.provider = query?.provider;
  }

  // filter on durationInWeeks
  if (query?.durationInWeeks && !isNaN(Number(query?.durationInWeeks))) {
    filter.durationInWeeks = Number(query?.durationInWeeks);
  }
  // filter based on level 
  if (query?.level) {
    filter['details.level'] = query?.level;
  }

  // Calculate pagination
  let page = 1;
  let limit = 10;
  let skip = 0;

  if (query?.page || query?.limit) {
    page = Number(query?.page);
    limit = Number(query?.limit);
    skip = (page - 1) * limit;
  }

  // implement sorting
  const sort: any = {};
  if (query?.sortBy || query?.sortOrder) {
    sort[query?.sortBy] = query?.sortOrder === 'asc' ? 1 : -1;
  }

  const data = await Course.find(filter, null, { skip, limit, sort });
  const count = await Course.countDocuments(filter);

  const meta = {
    page,
    limit,
    total: count,
  };
  const result = { meta, data };

  return result;
};


// Update course data into db
const updateCourseDataIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  const { tags, details, durationInWeeks, ...remaingData } = payload;

  // No one can't update duration weeks directly
  if (durationInWeeks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      " Can't update duration week directly",
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedData: Record<string, unknown> = { ...remaingData };

    // Update details object
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        updatedData[`details.${key}`] = value;
      }
    }

    const updateBasicAndObjectsData = await Course.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicAndObjectsData) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        ' Falied to update basic couese data',
      );
    }

    // Update tags data
    if (tags) {
      const existigTags = updateBasicAndObjectsData.tags || [];
      tags.forEach((newTags) => {
        const existingTagIndex = existigTags.findIndex(
          (tag) => tag.name === newTags.name,
        );
        if (existingTagIndex !== -1) {
          existigTags[existingTagIndex] = newTags;
        } else {
          existigTags.push(newTags);
        }
      });
      updateBasicAndObjectsData.tags = existigTags.filter(
        (tag) => !tag.isDeleted,
      );
      await Course.findByIdAndUpdate(
        id,
        {
          $set: { tags: updateBasicAndObjectsData.tags },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return await Course.findById(id);
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, ' Falied to update course');
  }
};

// Get course with reviews
const getCourseWithReviews = async (id: string) => {
  try {
    const course = await Course.findById(id);

    const reviews = await Review.find({ courseId: id });

    return { course, reviews };
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      ' Falied to get course with reviews',
    );
  }
};

// Get best course based on review
const getBestCourseFromDB = async () => {
  const reviews = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);
  const bestCourse = reviews.reduce((prev, current) =>
    prev.averageRating > current.averageRating ? prev : current,
  );

  const { _id, averageRating, reviewCount } = bestCourse;

  const course = await Course.findById(_id);

  if (!course) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course not forund');
  }

  return { course, averageRating, reviewCount };
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseDataIntoDB,
  getCourseWithReviews,
  getBestCourseFromDB,
};
