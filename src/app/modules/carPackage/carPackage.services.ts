import { CarPackage, Status } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import { ApiError } from '../../middlewares/globalErrorHandler';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';
import { FilterDataType } from './carPackage.interface';

const createData = async (data: CarPackage): Promise<CarPackage> => {
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
          seatCapacity: {
            equals: filtersData.seatCapacity && Number(filtersData.seatCapacity),
          },
        },
        {
          fuel: { equals: filtersData.fuel as string, mode: 'insensitive' },
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

  if (!result) {
    throw new ApiError(404, 'Car data not found');
  }
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

const makeCarAvailable = async (id: string): Promise<CarPackage> => {
  const carData = await prisma.carPackage.findUnique({ where: { id } });

  if (!carData) {
    throw new ApiError(404, 'This Car does not exist');
  }

  const result = await prisma.$transaction(async tx => {
    // Check if there are any associated bookings for this car
    const associatedBookings = await tx.booking.findMany({
      where: {
        carPackageId: carData.id,
        status: Status.PENDING,
      },
    });
    if (associatedBookings.length > 0) {
      for (const booking of associatedBookings) {
        await tx.booking.update({
          where: { id: booking.id },
          data: { status: Status.CANCELED },
        });
      }
    }

    // Update car availability
    await tx.carPackage.update({
      where: { id: carData.id },
      data: { isAvailable: true, bookedUntil: '' },
    });

    return carData;
  });
  return result;
};
type CalculatePricePayload = {
  tripType: string;
  reserveDays: number;
};

const getCalculatedPrice = async (
  carPackageId: string,
  payload: CalculatePricePayload
): Promise<number> => {
  const { tripType, reserveDays } = payload;

  const carPackage = await prisma.carPackage.findUnique({
    where: { id: carPackageId },
    include: {
      service: true,
    },
  });
  if (!carPackage) {
    throw new ApiError(404, 'Car package not found');
  }

  let additionalCharge = 0;
  if (tripType === 'inside') {
    additionalCharge = 50; // Adjust the amount as needed
  } else if (tripType === 'outside') {
    additionalCharge = 100; // Adjust the amount as needed
  }

  const basePrice = Number(carPackage.service.price);
  const totalPrice = basePrice + additionalCharge * reserveDays;
  return totalPrice;
};

export const carPackageService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
  makeCarAvailable,
  getCalculatedPrice,
};
