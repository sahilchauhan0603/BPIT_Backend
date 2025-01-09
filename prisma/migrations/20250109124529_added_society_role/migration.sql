/*
  Warnings:

  - Added the required column `role` to the `EventAttendee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_societyId_fkey`;

-- DropIndex
DROP INDEX `Event_societyId_fkey` ON `event`;

-- AlterTable
ALTER TABLE `event` MODIFY `societyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `eventattendee` ADD COLUMN `role` VARCHAR(191) NOT NULL;


-- CreateTable
CREATE TABLE `SocietyRole` (
    `societyRoleId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `roleType` VARCHAR(191) NOT NULL,
    `roleName` VARCHAR(191) NOT NULL,
    `roleDescription` VARCHAR(191) NOT NULL,
    `lastDateToApply` DATETIME(3) NOT NULL,
    `Responsibilities` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`societyRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocietyRole` ADD CONSTRAINT `SocietyRole_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
