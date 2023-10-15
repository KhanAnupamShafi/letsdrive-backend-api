import { Review } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import { ApiError } from '../../middlewares/globalErrorHandler';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';
import { FilterDataType } from './review.interfaces';

const createData = async (data: Review): Promise<Review> => {
  const result = await prisma.review.create({ data });
  return result;
};

const retrieveManyData = async (
  filtersData: FilterDataType,
  options: IPaginationOptions
): Promise<IGenericResponse<Review[]>> => {
  const { limit, page, skip } = calcPagination(options);
  const { searchTerm, ...filterOnlyFields } = filtersData;
  console.log(filtersData);
  const result = await prisma.review.findMany({
    include: { carPackage: true, user: true },
    where: {
      AND: [
        {
          OR: [
            {
              user: {
                email: { contains: searchTerm, mode: 'insensitive' },
              },
            },
          ],
        },
        {
          carPackage: {
            id: {
              equals: filterOnlyFields.carPackageId,
            },
          },
        },
      ],
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.review.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    include: { carPackage: true, user: true },
    where: { id },
  });
  if (!result) {
    throw new ApiError(404, 'Review not found');
  }
  return result;
};

const updateOneData = async (id: string, payload: Partial<Review>): Promise<Review> => {
  const result = await prisma.review.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.review.delete({
    where: { id },
  });
  return result;
};

export const ReviewService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
