/*
  Warnings:

  - You are about to drop the `societycoordinator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `facultyId` to the `SocietyProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `StudentAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `societycoordinator` DROP FOREIGN KEY `SocietyCoordinator_facultyId_fkey`;

-- DropForeignKey
ALTER TABLE `societycoordinator` DROP FOREIGN KEY `SocietyCoordinator_societyId_fkey`;

-- AlterTable
ALTER TABLE `societyprofile` ADD COLUMN `facultyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `studentachievement` ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `societycoordinator`;

-- AddForeignKey
ALTER TABLE `SocietyProfile` ADD CONSTRAINT `SocietyProfile_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAchievement` ADD CONSTRAINT `StudentAchievement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
