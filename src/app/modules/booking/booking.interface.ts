import { Status } from '@prisma/client';

export type FilterDataType = {
  searchTerm?: string | undefined;
  carPackageId?: string | undefined;
  status?: Status | undefined;
  tripType?: string | undefined;
  departureDate?: Date | undefined;
  minCost?: number | undefined;
  maxCost?: number | undefined;
};
