import { CarPackage } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';
import { FilterDataType } from './carPackage.interface';

const createData = async (data: CarPackage): Promise<CarPackage> => {
  const { carAvailable } = data;
  if (carAvailable > 0) {
    data.availability = true;
  }
  const result = await prisma.carPackage.create({ data, include: { service: true } });
  return result;
};

const retrieveManyData = async (
  filtersData: FilterDataType,
  options: IPaginationOptions
): Promise<IGenericResponse<CarPackage[]>> => {
  const { limit, page, skip } = calcPagination(options);

  const result = await prisma.carPackage.findMany({
    include: { service: true },
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: filtersData.searchTerm && (filtersData.searchTerm as string),
                mode: 'insensitive',
              },
            },
            {
              model: {
                contains: filtersData.searchTerm && (filtersData.searchTerm as string),
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          service: {
            name: {
              equals: filtersData.service as string,
              mode: 'insensitive',
            },
          },
        },

        {
          priceStart: {
            gte: filtersData.minPrice && Number(filtersData.minPrice),
            lte: filtersData.minPrice && Number(filtersData.maxPrice),
          },
        },
        {
          availability:
            filtersData.availability && filtersData.availability === 'true' ? true : false,
        },
        {
          seatCapacity: {
            equals: filtersData.seatCapacity && Number(filtersData.seatCapacity),
          },
        },
        {
          fuel: { equals: filtersData.fuel as string, mode: 'insensitive' },
        },
        // {
        //   rating: {
        //     gte: filtersData.minRating as number,
        //     lte: filtersData.maxRating as number,
        //   },
        // },
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
  const total = await prisma.carPackage.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<CarPackage | null> => {
  const result = await prisma.carPackage.findUnique({
    include: { service: true },
    where: { id },
  });
  return result;
};

const updateOneData = async (id: string, payload: Partial<CarPackage>): Promise<CarPackage> => {
  const result = await prisma.carPackage.update({
    include: { service: true },
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.carPackage.delete({
    where: { id },
  });
  return result;
};

export const carPackageService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
