/*
  Warnings:

  - You are about to drop the column `name` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `lecturetime` table. All the data in the column will be lost.
  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `name` on the `level` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[levelCourseId,lectureDate,timeId]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseName` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lectureTimeName` to the `LectureTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelName` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherName` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
-- DROP INDEX `Lecture_levelCourseId_timeId_key` ON `lecture`;

-- AlterTable
ALTER TABLE `course`
CHANGE COLUMN `name` `courseName` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `lecturetime`
    CHANGE COLUMN `name` `lectureTimeName` VARCHAR(191) NOT NULL,
    MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `level`
    CHANGE COLUMN `name` `levelName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teacher`
    CHANGE COLUMN `name` `teacherName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Lecture_levelCourseId_lectureDate_timeId_key` ON `Lecture`(`levelCourseId`, `lectureDate`, `timeId`);
