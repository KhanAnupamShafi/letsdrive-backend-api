/*
  Warnings:

  - You are about to drop the column `category` on the `contents` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
