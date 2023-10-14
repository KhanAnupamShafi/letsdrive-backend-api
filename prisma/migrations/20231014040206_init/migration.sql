/*
  Warnings:

  - You are about to drop the column `service_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `car_packages` table. All the data in the column will be lost.
  - Added the required column `car_package_id` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_service_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "service_id",
ADD COLUMN     "car_package_id" TEXT NOT NULL,
ADD COLUMN     "total_cost" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "car_packages" DROP COLUMN "cardId",
ADD COLUMN     "carId" SERIAL NOT NULL;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_car_package_id_fkey" FOREIGN KEY ("car_package_id") REFERENCES "car_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
