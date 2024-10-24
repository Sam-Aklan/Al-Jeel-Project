/*
  Warnings:

  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[levelId,courseId,day,timeId]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Lecture_levelId_courseId_day_timeId_key` ON `Lecture`(`levelId`, `courseId`, `day`, `timeId`);
