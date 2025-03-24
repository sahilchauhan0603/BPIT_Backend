/*
  Warnings:

  - Added the required column `qualifications` to the `JobsPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredSkills` to the `JobsPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibilities` to the `JobsPosting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `achievement` DROP FOREIGN KEY `Achievement_userId_fkey`;

-- DropForeignKey
ALTER TABLE `eventattendee` DROP FOREIGN KEY `EventAttendee_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `eventattendee` DROP FOREIGN KEY `EventAttendee_userId_fkey`;

-- DropForeignKey
ALTER TABLE `gallary` DROP FOREIGN KEY `Gallary_societyId_fkey`;

-- DropForeignKey
ALTER TABLE `interviewexperience` DROP FOREIGN KEY `InterviewExperience_userId_fkey`;

-- DropForeignKey
ALTER TABLE `jobsposting` DROP FOREIGN KEY `JobsPosting_userId_fkey`;

-- DropForeignKey
ALTER TABLE `professionalinformation` DROP FOREIGN KEY `ProfessionalInformation_userId_fkey`;

-- DropIndex
DROP INDEX `Achievement_userId_fkey` ON `achievement`;

-- DropIndex
DROP INDEX `EventAttendee_eventId_fkey` ON `eventattendee`;

-- DropIndex
DROP INDEX `EventAttendee_userId_fkey` ON `eventattendee`;

-- DropIndex
DROP INDEX `Gallary_societyId_fkey` ON `gallary`;

-- DropIndex
DROP INDEX `InterviewExperience_userId_fkey` ON `interviewexperience`;

-- DropIndex
DROP INDEX `JobsPosting_userId_fkey` ON `jobsposting`;

-- DropIndex
DROP INDEX `ProfessionalInformation_userId_fkey` ON `professionalinformation`;

-- AlterTable
ALTER TABLE `jobsposting` ADD COLUMN `qualifications` VARCHAR(191) NOT NULL,
    ADD COLUMN `requiredSkills` VARCHAR(191) NOT NULL,
    ADD COLUMN `responsibilities` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;


-- CreateTable
CREATE TABLE `Album` (
    `albumId` INTEGER NOT NULL AUTO_INCREMENT,
    `albumName` VARCHAR(191) NOT NULL,
    `albumDescription` VARCHAR(191) NOT NULL,
    `albumThumbnail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`albumId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlumniImages` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `imageTitle` VARCHAR(191) NOT NULL,
    `imageDescription` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `albumId` INTEGER NOT NULL,

    PRIMARY KEY (`imageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplication` (
    `jobApplicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `jobPostingId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'SHORTLISTED', 'REJECTED', 'HIRED') NOT NULL DEFAULT 'PENDING',
    `resumeUrl` VARCHAR(191) NOT NULL,
    `coverLetter` VARCHAR(191) NULL,
    `appliedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`jobApplicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentorshipProgram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `mentorType` ENUM('FACULTY', 'ALUMNI') NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `prerequisites` VARCHAR(191) NULL,
    `schedule` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'UPCOMING', 'COMPLETED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MentorshipApplication` (
    `id` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `mentorshipId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Designation` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `Enrollmentno` VARCHAR(191) NOT NULL,
    `Location` VARCHAR(191) NOT NULL,
    `Area` VARCHAR(191) NOT NULL,
    `Floorno` VARCHAR(191) NOT NULL,
    `Roomno` VARCHAR(191) NOT NULL,
    `Itemtype` VARCHAR(191) NOT NULL,
    `Equipmentid` VARCHAR(191) NOT NULL,
    `Issuedescription` VARCHAR(191) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Achievement` ADD CONSTRAINT `Achievement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallary` ADD CONSTRAINT `Gallary_societyId_fkey` FOREIGN KEY (`societyId`) REFERENCES `SocietyProfile`(`societyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumniImages` ADD CONSTRAINT `AlumniImages_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Album`(`albumId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalInformation` ADD CONSTRAINT `ProfessionalInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobsPosting` ADD CONSTRAINT `JobsPosting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_jobPostingId_fkey` FOREIGN KEY (`jobPostingId`) REFERENCES `JobsPosting`(`jobsPostingId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JobApplication` ADD CONSTRAINT `JobApplication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InterviewExperience` ADD CONSTRAINT `InterviewExperience_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendee` ADD CONSTRAINT `EventAttendee_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`eventId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventAttendee` ADD CONSTRAINT `EventAttendee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorshipProgram` ADD CONSTRAINT `MentorshipProgram_facultyMentor_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Faculty`(`facultyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorshipProgram` ADD CONSTRAINT `MentorshipProgram_alumniMentor_fkey` FOREIGN KEY (`mentorId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorshipApplication` ADD CONSTRAINT `MentorshipApplication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MentorshipApplication` ADD CONSTRAINT `MentorshipApplication_mentorshipId_fkey` FOREIGN KEY (`mentorshipId`) REFERENCES `MentorshipProgram`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
