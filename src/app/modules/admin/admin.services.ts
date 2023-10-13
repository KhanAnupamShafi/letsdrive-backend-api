import { Admin } from '@prisma/client';
import { IGenericResponse, IPaginationOptions } from '../../../interface/common';
import calcPagination from '../../shared/calcPagination';
import prisma from '../../shared/prisma';

const createData = async (data: Admin): Promise<Admin> => {
  const result = await prisma.admin.create({ data });
  return result;
};

const retrieveManyData = async (
  filtersData: Record<string, unknown>,
  options: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { limit, page, skip } = calcPagination(options);

  const searchTerm = filtersData.searchTerm as string;
  const result = await prisma.admin.findMany({
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
  const total = await prisma.admin.count({});

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const retrieveOneData = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

const updateOneData = async (id: string, payload: Partial<Admin>): Promise<Admin> => {
  const result = await prisma.admin.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.admin.delete({
    where: { id },
  });
  return result;
};

export const adminService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
