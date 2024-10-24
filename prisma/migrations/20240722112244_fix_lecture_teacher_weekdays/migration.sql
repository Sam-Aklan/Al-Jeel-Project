/*
  Warnings:

  - You are about to drop the column `teacherId` on the `lecture` table. All the data in the column will be lost.
  - You are about to alter the column `startTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `endTime` on the `lecturetime` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropIndex
DROP INDEX `Lecture_teacherId_fkey` ON `lecture`;

-- AlterTable
ALTER TABLE `lecture` DROP COLUMN `teacherId`;

-- AlterTable
ALTER TABLE `lecturetime` MODIFY `startTime` TIMESTAMP NOT NULL,
    MODIFY `endTime` TIMESTAMP NOT NULL;
