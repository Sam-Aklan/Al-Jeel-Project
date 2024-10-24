/*
  Warnings:

  - You are about to drop the column `courseId` on the `lecture` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `lecture` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `lecture` table. All the data in the column will be lost.
  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[levelCourseId,timeId]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelCourseId` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_levelId_fkey`;

-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_teacherId_fkey`;

-- DropIndex
DROP INDEX `Lecture_levelId_courseId_day_timeId_key` ON `lecture`;

-- AlterTable
ALTER TABLE `lecture` DROP COLUMN `courseId`,
    DROP COLUMN `day`,
    DROP COLUMN `levelId`,
    ADD COLUMN `levelCourseId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `LevelCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `levelId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LevelCourse_levelId_courseId_key`(`levelId`, `courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Lecture_levelCourseId_timeId_key` ON `Lecture`(`levelCourseId`, `timeId`);

-- AddForeignKey
ALTER TABLE `Lecture` ADD CONSTRAINT `Lecture_levelCourseId_fkey` FOREIGN KEY (`levelCourseId`) REFERENCES `LevelCourse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LevelCourse` ADD CONSTRAINT `LevelCourse_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `Level`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LevelCourse` ADD CONSTRAINT `LevelCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
