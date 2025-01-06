/*
  Warnings:

  - The primary key for the `societymember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrollmentNo` on the `societymember` table. All the data in the column will be lost.
  - The primary key for the `studentachievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `enrollmentNo` on the `studentachievement` table. All the data in the column will be lost.
  - You are about to alter the column `enrollmentNumber` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `memberId` to the `SocietyMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `StudentAchievement_enrollmentNo_societyId_idx` ON `studentachievement`;

-- AlterTable
ALTER TABLE `societyachievement` MODIFY `societyAchievementId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `societymember` DROP PRIMARY KEY,
    DROP COLUMN `enrollmentNo`,
    ADD COLUMN `memberId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`memberId`);

-- AlterTable
ALTER TABLE `societyprofile` MODIFY `societyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `studentachievement` DROP PRIMARY KEY,
    DROP COLUMN `enrollmentNo`,
    ADD PRIMARY KEY (`achievementId`);

-- AlterTable
ALTER TABLE `studentmarking` MODIFY `enrollmentNo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `enrollmentNumber` INTEGER NOT NULL;


