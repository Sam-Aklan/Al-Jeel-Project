-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_levelId_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
