import { Service } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';

const createData = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({ data });
  return result;
};

const retrieveManyData = async (
  filtersData: Record<string, unknown>,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { limit, page, skip } = calcPagination(options);

  const searchTerm = filtersData.searchTerm as string;
  const result = await prisma.service.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
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
  const total = await prisma.service.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: { id },
  });
  return result;
};

const updateOneData = async (id: string, payload: Partial<Service>): Promise<Service> => {
  const result = await prisma.service.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.service.delete({
    where: { id },
  });
  return result;
};

export const rentService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
