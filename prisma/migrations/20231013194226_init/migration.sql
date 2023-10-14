/*
  Warnings:

  - You are about to drop the column `days` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `departureTime` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `availability` on the `car_packages` table. All the data in the column will be lost.
  - You are about to drop the column `car_available` on the `car_packages` table. All the data in the column will be lost.
  - You are about to drop the column `seatCapacity` on the `car_packages` table. All the data in the column will be lost.
  - Added the required column `departure_date` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departure_time` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booked_until` to the `car_packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_capacity` to the `car_packages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_service_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "days",
DROP COLUMN "departureTime",
ADD COLUMN     "departure_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departure_time" TEXT NOT NULL,
ADD COLUMN     "reserve_days" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "car_packages" DROP COLUMN "availability",
DROP COLUMN "car_available",
DROP COLUMN "seatCapacity",
ADD COLUMN     "booked_until" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cardId" SERIAL NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "seat_capacity" INTEGER NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "car_packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
