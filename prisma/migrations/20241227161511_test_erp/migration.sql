/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobile]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollmentNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `enrollmentNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facultyId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fathersName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hobby` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mothersName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentsPhone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passingYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `codeforcesProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `codingNinjaProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `enrollmentNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `facultyId` INTEGER NOT NULL,
    ADD COLUMN `fathersName` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `gfgProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `githubProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `hobby` VARCHAR(191) NOT NULL,
    ADD COLUMN `instagramProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `leetcodeProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `linkedInProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `mobile` VARCHAR(191) NOT NULL,
    ADD COLUMN `mothersName` VARCHAR(191) NOT NULL,
    ADD COLUMN `parentsPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `passingYear` INTEGER NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `profilePictureUrl` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('STUDENT', 'ALUMNI') NOT NULL,
    ADD COLUMN `section` VARCHAR(191) NOT NULL,
    ADD COLUMN `twitterProfileUrl` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `Faculty` (
    `facultyId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `specialization` VARCHAR(191) NOT NULL,
    `joiningDate` DATETIME(3) NOT NULL,
    `resigningDate` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `profilePictureUrl` VARCHAR(191) NOT NULL,
    `others` VARCHAR(191) NOT NULL,
    `isActiveFaculty` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Faculty_phone_key`(`phone`),
    UNIQUE INDEX `Faculty_email_key`(`email`),
    PRIMARY KEY (`facultyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievement` (
    `achievementId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `dateAchieved` DATETIME(3) NOT NULL,
    `mode` BOOLEAN NOT NULL,
    `isTechnical` BOOLEAN NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `proofUrl` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`achievementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlumniAchievement` (
    `alumniAchievementsId` INTEGER NOT NULL AUTO_INCREMENT,
    `alumniId` INTEGER NOT NULL,
    `achievementId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AlumniAchievement_achievementId_key`(`achievementId`),
    PRIMARY KEY (`alumniAchievementsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gallary` (
    `gallaryId` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `imageTitle` VARCHAR(191) NOT NULL,
    `imageDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`gallaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfessionalInformation` (
    `professionalInformationId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `CTC` VARCHAR(191) NOT NULL,
    `employmentType` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`professionalInformationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InterviewExperience` (
    `interviewExperienceId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `interviewBody` VARCHAR(191) NOT NULL,
    `interviewDate` DATETIME(3) NOT NULL,
    `onCampus` BOOLEAN NOT NULL,
    `refferal` BOOLEAN NOT NULL,
    `anyTips` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`interviewExperienceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `eventId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventName` VARCHAR(191) NOT NULL,
    `eventDescription` VARCHAR(191) NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,
    `eventLocation` VARCHAR(191) NOT NULL,
    `eventImage` VARCHAR(191) NOT NULL,
    `eventMode` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `subcategory` VARCHAR(191) NOT NULL,
    `linkToRegister` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventAttendee` (
    `eventAttendeeId` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`eventAttendeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `newsId` INTEGER NOT NULL AUTO_INCREMENT,
    `newsTitle` VARCHAR(191) NOT NULL,
    `newsDescription` VARCHAR(191) NOT NULL,
    `newsImage` VARCHAR(191) NOT NULL,
    `newsDate` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`newsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyProfile` (
    `societyId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyType` VARCHAR(191) NOT NULL,
    `societyName` VARCHAR(191) NOT NULL,
    `dateOfRegistration` DATETIME(3) NOT NULL,
    `societyDescription` VARCHAR(191) NOT NULL,
    `societyImage` VARCHAR(191) NOT NULL,
    `societyEmail` VARCHAR(191) NOT NULL,
    `societyHeadMobile` VARCHAR(191) NOT NULL,
    `societyWebsite` VARCHAR(191) NOT NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `SocietyProfile_societyEmail_key`(`societyEmail`),
    PRIMARY KEY (`societyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyCoordinator` (
    `coordinatorId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `facultyId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isActiveCoordinator` BOOLEAN NOT NULL DEFAULT true,
    `crestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`coordinatorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyTestimonial` (
    `societyTestimonialId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`societyTestimonialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyAchievment` (
    `societyAchievmentId` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`societyAchievmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonials` (
    `testimonialId` INTEGER NOT NULL AUTO_INCREMENT,
    `testimonialTitle` VARCHAR(191) NOT NULL,
    `testimonialDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`testimonialId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyGallery` (
    `societyGalleryId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,

    PRIMARY KEY (`societyGalleryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocietyNews` (
    `societyNewsId` INTEGER NOT NULL AUTO_INCREMENT,
    `societyId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `visibility` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`societyNewsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `equipmentId` INTEGER NOT NULL AUTO_INCREMENT,
    `equipmentName` VARCHAR(191) NOT NULL,
    `equipmentNumber` BIGINT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `warranty` VARCHAR(191) NOT NULL,
    `supplier` VARCHAR(191) NOT NULL,
    `lastMaintenance` DATETIME(3) NOT NULL,
    `remarks` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`equipmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `roomId` INTEGER NOT NULL AUTO_INCREMENT,
    `roomNumber` INTEGER NOT NULL,
    `floor` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `allotedToDepartment` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`roomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentHistory` (
    `equipmentHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `equipmentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isSolved` BOOLEAN NOT NULL DEFAULT false,
    `complaintDate` DATETIME(3) NOT NULL,
    `SolvedDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`equipmentHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_mobile_key` ON `User`(`mobile`);

-- CreateIndex
CREATE UNIQUE INDEX `User_enrollmentNumber_key` ON `User`(`enrollmentNumber`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_facultyId_fkey` FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`facultyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Achievement` ADD CONSTRAINT `Achievement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumniAchievement` ADD CONSTRAINT `AlumniAchievement_alumniId_fkey` FOREIGN KEY (`alumniId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumniAchievement` ADD CONSTRAINT `AlumniAchievement_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievement`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalInformation` ADD CONSTRAINT `ProfessionalInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewExperience` ADD CONSTRAINT `InterviewExperience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendee` ADD CONSTRAINT `EventAttendee_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`eventId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendee` ADD CONSTRAINT `EventAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentHistory` ADD CONSTRAINT `EquipmentHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentHistory` ADD CONSTRAINT `EquipmentHistory_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`equipmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
