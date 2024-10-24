import { Prisma } from "@prisma/client";
import { IsNotEmpty} from "class-validator";

export class CreateLectureTimeDto {
    @IsNotEmpty({message:"name is required"})
    lectureTimeName:string;
    @IsNotEmpty({message:"please provid a start time for the class session"})
    startTime:Date;
    @IsNotEmpty({message:"please provid a end time for the class session"})
    endTime:Date;

}

export type lectureTimeType = Prisma.LectureTimeGetPayload<{

}>