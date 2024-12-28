/*
  Warnings:

  - You are about to drop the column `createdAt` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `dateAchieved` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `proofUrl` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `achievement` table. All the data in the column will be lost.
  - You are about to alter the column `mode` on the `achievement` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.
  - You are about to drop the `achievements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateModified` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizedBy` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `achievementimages` DROP FOREIGN KEY `achievementImages_achievementId_fkey`;

-- AlterTable
ALTER TABLE `achievement` DROP COLUMN `createdAt`,
    DROP COLUMN `dateAchieved`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `isVerified`,
    DROP COLUMN `location`,
    DROP COLUMN `proofUrl`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `certificate` VARCHAR(191) NULL,
    ADD COLUMN `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `dateModified` DATETIME(3) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `organizedBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `result` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    MODIFY `mode` ENUM('ONLINE', 'OFFLINE') NOT NULL;

-- AlterTable
ALTER TABLE `achievementannouncement` MODIFY `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `notification` MODIFY `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `verificationrequest` MODIFY `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `achievements`;

-- AddForeignKey
ALTER TABLE `achievementImages` ADD CONSTRAINT `achievementImages_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;
