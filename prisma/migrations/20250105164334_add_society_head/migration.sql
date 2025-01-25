/*
  Warnings:

  - You are about to drop the `societyachievment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `societyachievment` DROP FOREIGN KEY `SocietyAchievment_societyId_fkey`;

-- DropTable
DROP TABLE `societyachievment`;

-- CreateTable
CREATE TABLE `SocietyAchievement` (
    `societyAchievementId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`societyAchievementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SocietyAchievement` ADD CONSTRAINT `SocietyAchievement_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
