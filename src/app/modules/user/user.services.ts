import { User } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import { ApiError } from '../../middlewares/globalErrorHandler';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';

const createData = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const retrieveManyData = async (
  filtersData: Record<string, unknown>,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = calcPagination(options);

  const searchTerm = filtersData.searchTerm as string;
  const result = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              fullName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
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
  const total = await prisma.user.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });

  if (!result) {
    throw new ApiError(404, 'User data not found');
  }
  return result;
};

const updateOneData = async (id: string, payload: Partial<User>): Promise<User> => {
  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const userService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
