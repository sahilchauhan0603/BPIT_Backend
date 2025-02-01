/*
  Warnings:

  - You are about to drop the column `userId` on the `achievementannouncement` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `verificationrequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `achievementannouncement` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `verificationrequest` DROP COLUMN `studentId`;

-- AddForeignKey
ALTER TABLE `AchievementAnnouncement` ADD CONSTRAINT `AchievementAnnouncement_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VerificationRequest` ADD CONSTRAINT `VerificationRequest_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;
