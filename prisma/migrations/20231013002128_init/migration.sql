/*
  Warnings:

  - You are about to drop the column `stock` on the `car_packages` table. All the data in the column will be lost.
  - Added the required column `car_available` to the `car_packages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_packages" DROP COLUMN "stock",
ADD COLUMN     "car_available" INTEGER NOT NULL;
