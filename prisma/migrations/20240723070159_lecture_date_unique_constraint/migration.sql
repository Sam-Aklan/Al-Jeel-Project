/*
  Warnings:

  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `lectureDate` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_levelCourseId_fkey`;

-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_timeId_fkey`;

-- AlterTable
ALTER TABLE `lecture` ADD COLUMN `lectureDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `Lecture` ADD CONSTRAINT `Lecture_levelCourseId_fkey` FOREIGN KEY (`levelCourseId`) REFERENCES `LevelCourse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lecture` ADD CONSTRAINT `Lecture_timeId_fkey` FOREIGN KEY (`timeId`) REFERENCES `LectureTime`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
