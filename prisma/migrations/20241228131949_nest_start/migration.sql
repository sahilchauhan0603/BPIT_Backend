/*
  Warnings:

  - You are about to drop the column `createdAt` on the `societyachievment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `societyachievment` table. All the data in the column will be lost.
  - You are about to drop the column `societyId` on the `societyachievment` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `societyachievment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `societyachievment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `societygallery` table. All the data in the column will be lost.
  - You are about to drop the column `imageDescription` on the `societygallery` table. All the data in the column will be lost.
  - You are about to drop the column `imageTitle` on the `societygallery` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `societygallery` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `societygallery` table. All the data in the column will be lost.
  - You are about to drop the column `anyImageUrl` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfNews` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `newsDescription` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `newsTitle` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the column `societyId` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `societytestimonial` table. All the data in the column will be lost.
  - You are about to drop the `societymember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `visibility` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `societyachievment` DROP FOREIGN KEY `SocietyAchievment_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societycoordinator` DROP FOREIGN KEY `SocietyCoordinator_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `societycoordinator` DROP FOREIGN KEY `SocietyCoordinator_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societygallery` DROP FOREIGN KEY `SocietyGallery_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societymember` DROP FOREIGN KEY `SocietyMember_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societymember` DROP FOREIGN KEY `SocietyMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `societynews` DROP FOREIGN KEY `SocietyNews_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societytestimonial` DROP FOREIGN KEY `SocietyTestimonial_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societytestimonial` DROP FOREIGN KEY `SocietyTestimonial_userId_fkey`;

-- AlterTable
ALTER TABLE `societyachievment` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `societyId`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `societygallery` DROP COLUMN `createdAt`,
    DROP COLUMN `imageDescription`,
    DROP COLUMN `imageTitle`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `societynews` DROP COLUMN `anyImageUrl`,
    DROP COLUMN `author`,
    DROP COLUMN `dateOfNews`,
    DROP COLUMN `newsDescription`,
    DROP COLUMN `newsTitle`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `visibility` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `societytestimonial` DROP COLUMN `description`,
    DROP COLUMN `societyId`,
    DROP COLUMN `title`,
    DROP COLUMN `userId`;

-- DropTable
DROP TABLE `societymember`;

-- CreateTable
CREATE TABLE `News` (
    `newsId` INTEGER NOT NULL AUTO_INCREMENT,
    `newsTitle` VARCHAR(191) NOT NULL,
    `newsDescription` VARCHAR(191) NOT NULL,
    `newsImage` VARCHAR(191) NOT NULL,
    `newsDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`newsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonials` (
    `testimonialId` INTEGER NOT NULL AUTO_INCREMENT,
    `testimonialTitle` VARCHAR(191) NOT NULL,
    `testimonialDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`testimonialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
