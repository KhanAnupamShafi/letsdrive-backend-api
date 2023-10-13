/*
  Warnings:

  - Added the required column `fuel` to the `car_packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `car_packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `car_packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_packages" ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "booking_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "image" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
