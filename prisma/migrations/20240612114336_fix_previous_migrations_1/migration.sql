/*
  Warnings:

  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[levelId,courseId,day,timeId]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `lecture` DROP FOREIGN KEY `Lecture_teacherId_fkey`;

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- CreateIndex
-- AddForeignKey
ALTER TABLE `Lecture` ADD CONSTRAINT `Lecture_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
