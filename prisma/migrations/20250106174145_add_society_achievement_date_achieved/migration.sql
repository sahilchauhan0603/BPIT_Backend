/*
  Warnings:

  - Added the required column `dateAchieved` to the `SocietyAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `societyachievement` ADD COLUMN `dateAchieved` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `societymember` MODIFY `dateResigned` DATETIME(3) NULL;

  