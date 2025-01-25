/*
  Warnings:

  - The primary key for the `studentmarking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrollmentNo` on the `studentmarking` table. All the data in the column will be lost.
  - You are about to drop the `societygallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `societynews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `StudentMarking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `societygallery` DROP FOREIGN KEY `SocietyGallery_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `societynews` DROP FOREIGN KEY `SocietyNews_societyId_fkey`;

-- DropIndex
DROP INDEX `StudentMarking_enrollmentNo_societyId_idx` ON `studentmarking`;

-- AlterTable
ALTER TABLE `gallary` ADD COLUMN `societyId` INTEGER NULL;

-- AlterTable
ALTER TABLE `news` ADD COLUMN `societyId` INTEGER NULL;



-- AlterTable
ALTER TABLE `studentmarking` DROP PRIMARY KEY,
    DROP COLUMN `enrollmentNo`,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `markingId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`markingId`);

-- DropTable
DROP TABLE `societygallery`;

-- DropTable
DROP TABLE `societynews`;

-- AddForeignKey
ALTER TABLE `Gallary` ADD CONSTRAINT `Gallary_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentMarking` ADD CONSTRAINT `StudentMarking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
