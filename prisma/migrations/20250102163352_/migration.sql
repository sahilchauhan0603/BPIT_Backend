-- DropIndex
DROP INDEX `SocietyCoordinator_facultyId_fkey` ON `societycoordinator`;

-- DropIndex
DROP INDEX `SocietyCoordinator_societyId_fkey` ON `societycoordinator`;

-- DropIndex
DROP INDEX `SocietyGallery_societyId_fkey` ON `societygallery`;

-- DropIndex
DROP INDEX `SocietyNews_societyId_fkey` ON `societynews`;

-- CreateTable
CREATE TABLE `JobsPosting` (
    `jobsPostingId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `jobTitle` VARCHAR(191) NOT NULL,
    `jobDescription` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `companyLocation` VARCHAR(191) NOT NULL,
    `jobMode` VARCHAR(191) NOT NULL,
    `jobType` VARCHAR(191) NOT NULL,
    `jobCategory` VARCHAR(191) NOT NULL,
    `expectedSalary` VARCHAR(191) NOT NULL,
    `applyLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`jobsPostingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `JobsPosting` ADD CONSTRAINT `JobsPosting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
