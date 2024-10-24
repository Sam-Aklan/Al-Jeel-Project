import { Prisma } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
export class CreateCourseDto {
    @IsNotEmpty({message:"course name is required"})
    courseName:string
}

export type courseType = Prisma.CourseGetPayload<{
    
}>
