/*
  Warnings:

  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - The primary key for the `teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[levelId,courseId]` on the table `Lecture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lecture` ADD COLUMN `teacherId` VARCHAR(191);

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `teacher` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Lecture` ADD CONSTRAINT `Lecture_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
