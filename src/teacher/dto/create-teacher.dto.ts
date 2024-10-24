import { Prisma } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateTeacherDto {
   
    @IsNotEmpty()
    teacherName:string;
    @IsNotEmpty({message:'you should provid a specilzation'})
    specialization:string;
}

export type teacherType = Prisma.TeacherGetPayload<{
    
}>