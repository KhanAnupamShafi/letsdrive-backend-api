import { Booking, Status } from '@prisma/client';
import httpStatus from 'http-status';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import { ApiError } from '../../middlewares/globalErrorHandler';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';
import { carPackageService } from '../carPackage/carPackage.services';
import { FilterDataType } from './booking.interface';

const createData = async (data: Booking): Promise<Booking> => {
  const { carPackageId, userId, tripType, reserveDays } = data;

  const existingPendingBooking = await prisma.booking.findFirst({
    where: {
      carPackageId: carPackageId,
      userId: userId,
      status: Status.PENDING,
    },
  });

  if (existingPendingBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You already have a pending booking for this car.');
  }

  const carData = await prisma.carPackage.findUnique({ where: { id: carPackageId } });
  if (!carData || !carData.isAvailable) {
    throw new ApiError(404, 'Car is not available for booking.');
  }

  // Calculate the total price
  const totalCost = await carPackageService.getCalculatedPrice(carPackageId, {
    tripType,
    reserveDays,
  });

  const result = await prisma.$transaction(async tx => {
    const newBooking = await tx.booking.create({
      data: {
        ...data,
        totalCost,
      },
      include: { carPackage: true, user: true },
    });

    return newBooking;
  });
  // const result = await prisma.booking.create({ data, include: { service: true } });
  return result;
};

const acceptBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.$transaction(async tx => {
    const bookingData = await tx.booking.findUnique({ where: { id } });
    if (!bookingData || bookingData.status !== Status.PENDING) {
      throw new ApiError(404, 'This booking info is not available');
    }
    const carData = await tx.carPackage.findUnique({ where: { id: bookingData?.carPackageId } });

    if (!carData || !carData.isAvailable) {
      throw new ApiError(404, 'This Car is not currently available for booking.');
    }
    // Calculate bookedUntil based on departure date and additional days
    const departureDateAsDate = new Date(bookingData?.departureDate);
    const additionalDays = bookingData?.reserveDays - 1;

    const bookedUntil = new Date(
      departureDateAsDate.getTime() + additionalDays * 24 * 60 * 60 * 1000
    ).toISOString();

    await tx.carPackage.update({
      where: { id: bookingData?.carPackageId },
      data: { isAvailable: false, bookedUntil },
    });
    const updatedBooking = await tx.booking.update({
      where: { id: bookingData?.id },
      data: { ...bookingData, status: Status.APPROVED },
      include: { carPackage: true, user: true },
    });

    return updatedBooking;
  });
  return result;
};

const cancelBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.$transaction(async tx => {
    const bookingData = await tx.booking.findUnique({ where: { id } });
    if (!bookingData || bookingData.status !== Status.PENDING) {
      throw new ApiError(404, 'This booking info is not available');
    }
    const carData = await tx.carPackage.findUnique({ where: { id: bookingData?.carPackageId } });

    if (!carData) {
      throw new ApiError(404, 'Cannot find car to cancel booking');
    }

    await tx.carPackage.update({
      where: { id: bookingData?.carPackageId },
      data: { isAvailable: true, bookedUntil: '' },
    });
    const updatedBooking = await tx.booking.update({
      where: { id: bookingData?.id },
      data: { ...bookingData, status: Status.CANCELED },
      include: { carPackage: true, user: true },
    });

    return updatedBooking;
  });
  return result;
};
const retrieveManyData = async (
  filtersData: FilterDataType,
  options: IPaginationOptions
): Promise<IGenericResponse<Booking[]>> => {
  const { limit, page, skip } = calcPagination(options);
  const { searchTerm, ...filterOnlyFields } = filtersData;
  const result = await prisma.booking.findMany({
    include: { carPackage: true, user: true },
    where: {
      AND: [
        {
          OR: [
            {
              user: {
                fullName: { contains: searchTerm, mode: 'insensitive' },
              },
            },
            {
              user: {
                phoneNumber: { contains: searchTerm, mode: 'insensitive' },
              },
            },
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

        {
          totalCost: {
            gte: filterOnlyFields.minCost && parseFloat(filterOnlyFields.minCost.toString()),
            lte: filterOnlyFields.maxCost && parseFloat(filterOnlyFields.maxCost.toString()),
          },
        },

        {
          departureDate: {
            equals: filterOnlyFields.departureDate as Date,
          },
        },
        {
          tripType: { equals: filterOnlyFields.tripType, mode: 'insensitive' },
        },
        {
          status: { equals: filterOnlyFields.status },
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
  const total = await prisma.booking.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    include: { carPackage: true, user: true },
    where: { id },
  });
  if (!result) {
    throw new ApiError(404, 'Booking data not found');
  }
  return result;
};

export const bookingService = {
  createData,
  acceptBooking,
  cancelBooking,
  retrieveManyData,
  retrieveOneData,
  // updateOneData,
  // deleteOneData,
};
