/*
  Warnings:

  - You are about to drop the `alumniachievement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alumniachievement` DROP FOREIGN KEY `AlumniAchievement_achievementId_fkey`;

-- DropForeignKey
ALTER TABLE `alumniachievement` DROP FOREIGN KEY `AlumniAchievement_alumniId_fkey`;



-- DropTable
DROP TABLE `alumniachievement`;
