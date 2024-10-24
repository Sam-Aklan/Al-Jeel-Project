import { IsNotEmpty,IsString } from "class-validator";

export class CreateLevelCourseDto {
    @IsNotEmpty({message:"provide a subject"})
    @IsString({message:"course should be string",})
    courseId:string;
    @IsNotEmpty({message:"provide a level"})
    @IsString({message:"level should be string"})
    levelId:string;
}
