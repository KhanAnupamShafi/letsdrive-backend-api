import { Content } from '@prisma/client';
import { ApiError } from '../../middlewares/globalErrorHandler';
import prisma from '../../shared/prisma';

const createData = async (data: Content): Promise<Content> => {
  const result = await prisma.content.create({ data, include: { category: true } });
  return result;
};

const retrieveFaqs = async (): Promise<Content | null> => {
  const result = await prisma.content.findFirst({
    where: {
      category: {
        name: {
          equals: 'faq',
          mode: 'insensitive',
        },
      },
    },
    include: { admin: { select: { fullName: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return result;
};

const retrieveOneData = async (id: string): Promise<Content | null> => {
  const result = await prisma.content.findUnique({
    where: { id },
    include: { admin: { select: { fullName: true } } },
  });
  if (!result) {
    throw new ApiError(404, 'Single Content data not found');
  }
  return result;
};

const updateOneData = async (id: string, payload: Partial<Content>): Promise<Content> => {
  const result = await prisma.content.update({
    where: { id },
    data: payload,
  });

  return result;
};

const deleteOneData = async (id: string) => {
  const result = await prisma.content.delete({
    where: { id },
  });
  return result;
};

export const CmsService = {
  createData,
  retrieveOneData,
  updateOneData,
  deleteOneData,
  retrieveFaqs,
};
