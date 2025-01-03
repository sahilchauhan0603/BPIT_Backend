/*
  Warnings:

  - You are about to drop the column `isActive` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `societynews` table. All the data in the column will be lost.
  - You are about to drop the `testimonials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `societyId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SocietyAchievment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `societyId` to the `SocietyAchievment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SocietyAchievment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SocietyAchievment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageDescription` to the `SocietyGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageTitle` to the `SocietyGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `SocietyGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SocietyGallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `anyImageUrl` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfNews` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsDescription` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newsTitle` to the `SocietyNews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `societyHead` to the `SocietyProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `SocietyTestimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `societyId` to the `SocietyTestimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `SocietyTestimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SocietyTestimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `societyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `societyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `societyachievment` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `societyId` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `societygallery` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `societynews` DROP COLUMN `isActive`,
    DROP COLUMN `visibility`,
    ADD COLUMN `anyImageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `author` VARCHAR(191) NOT NULL,
    ADD COLUMN `dateOfNews` DATETIME(3) NOT NULL,
    ADD COLUMN `newsDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `newsTitle` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `societyprofile` ADD COLUMN `societyHead` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `societytestimonial` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `societyId` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `branch` VARCHAR(191) NOT NULL,
    ADD COLUMN `societyId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `testimonials`;

-- CreateTable
CREATE TABLE `StudentAchievement` (
    `enrollmentNo` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `achievementId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `dateAchieved` DATETIME(3) NOT NULL,

    INDEX `StudentAchievement_enrollmentNo_societyId_idx`(`enrollmentNo`, `societyId`),
    PRIMARY KEY (`enrollmentNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentMarking` (
    `enrollmentNo` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `markingId` INTEGER NOT NULL,
    `studentGrades` VARCHAR(191) NOT NULL,

    INDEX `StudentMarking_enrollmentNo_societyId_idx`(`enrollmentNo`, `societyId`),
    PRIMARY KEY (`enrollmentNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyMember` (
    `userId` INTEGER NOT NULL,
    `enrollmentNo` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `societyPosition` VARCHAR(191) NOT NULL,
    `domainExpertise` VARCHAR(191) NOT NULL,
    `memberType` VARCHAR(191) NOT NULL,
    `studentContributions` VARCHAR(191) NOT NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT true,
    `isActiveMember` BOOLEAN NOT NULL DEFAULT true,
    `dateJoined` DATETIME(3) NOT NULL,
    `dateResigned` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`enrollmentNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SocietyUsers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SocietyUsers_AB_unique`(`A`, `B`),
    INDEX `_SocietyUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyCoordinator` ADD CONSTRAINT `SocietyCoordinator_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyCoordinator` ADD CONSTRAINT `SocietyCoordinator_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyTestimonial` ADD CONSTRAINT `SocietyTestimonial_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyTestimonial` ADD CONSTRAINT `SocietyTestimonial_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyAchievment` ADD CONSTRAINT `SocietyAchievment_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAchievement` ADD CONSTRAINT `StudentAchievement_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentMarking` ADD CONSTRAINT `StudentMarking_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyMember` ADD CONSTRAINT `SocietyMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyMember` ADD CONSTRAINT `SocietyMember_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyGallery` ADD CONSTRAINT `SocietyGallery_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyNews` ADD CONSTRAINT `SocietyNews_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SocietyUsers` ADD CONSTRAINT `_SocietyUsers_A_fkey` FOREIGN KEY (`A`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SocietyUsers` ADD CONSTRAINT `_SocietyUsers_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
