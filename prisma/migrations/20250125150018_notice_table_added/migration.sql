

-- CreateTable
CREATE TABLE `Notice` (
    `noticeId` INTEGER NOT NULL AUTO_INCREMENT,
    `noticeTitle` VARCHAR(191) NOT NULL,
    `noticeDescription` VARCHAR(191) NULL,
    `noticeDate` DATETIME(3) NOT NULL,
    `noticeLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`noticeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
