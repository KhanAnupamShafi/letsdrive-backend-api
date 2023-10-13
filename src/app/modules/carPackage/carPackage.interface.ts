export type FilterDataType = {
  searchTerm?: string;
  model?: string;
  service?: string;
  availability?: boolean | string;
  minPrice?: number;
  maxPrice?: number;
  seatCapacity?: number;
  fuel?: string;
};
