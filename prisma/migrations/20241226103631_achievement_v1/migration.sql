-- CreateTable
CREATE TABLE `Achievements` (
    `achievementId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `organizedBy` VARCHAR(191) NOT NULL,
    `mode` ENUM('ONLINE', 'OFFLINE') NOT NULL,
    `isTechnical` BOOLEAN NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `certificate` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`achievementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievementImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `achievementId` INTEGER NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AchievementAnnouncement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `achievementId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `achievementId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `mentorId` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL,
    `dateModified` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `achievementImages` ADD CONSTRAINT `achievementImages_achievementId_fkey` FOREIGN KEY (`achievementId`) REFERENCES `Achievements`(`achievementId`) ON DELETE RESTRICT ON UPDATE CASCADE;
