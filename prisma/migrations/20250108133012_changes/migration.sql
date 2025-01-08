/*
  Warnings:

  - You are about to drop the column `createdAt` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `societytestimonial` table. All the data in the column will be lost.

*/

-- AlterTable
ALTER TABLE `societytestimonial` DROP COLUMN `createdAt`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`,
    MODIFY `societyTestimonialId` INTEGER NOT NULL;
