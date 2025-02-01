/*
  Warnings:

  - You are about to drop the `achievementannouncement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationrequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `achievementannouncement` DROP FOREIGN KEY `AchievementAnnouncement_achievementId_fkey`;

-- DropForeignKey
ALTER TABLE `verificationrequest` DROP FOREIGN KEY `VerificationRequest_achievementId_fkey`;


-- DropTable
DROP TABLE `achievementannouncement`;

-- DropTable
DROP TABLE `verificationrequest`;

-- CreateTable
CREATE TABLE `achievementAnnouncements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `achievementId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `achievementId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `achievementAnnouncements` ADD CONSTRAINT `achievementAnnouncements_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verificationRequests` ADD CONSTRAINT `verificationRequests_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;
