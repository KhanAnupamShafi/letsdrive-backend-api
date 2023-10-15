import { Category } from '@prisma/client';
import { ApiError } from '../../../middlewares/globalErrorHandler';
import prisma from '../../../shared/prisma';

const createData = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });
  return result;
};

const retrieveManyData = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return result;
};

const retrieveOneData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: { Content: { include: { admin: { select: { fullName: true } } } } },
  });
  if (!result) {
    throw new ApiError(404, 'Category data not found');
  }
  return result;
};

const updateOneData = async (id: string, payload: Partial<Category>): Promise<Category> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const CategoryService = {
  createData,
  retrieveManyData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
};
