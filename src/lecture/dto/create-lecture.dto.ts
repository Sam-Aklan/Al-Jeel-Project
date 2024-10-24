import { Prisma,  } from "@prisma/client";
import { Transform, TransformFnParams } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, } from "class-validator";
export class CreateLectureDto {
    
    // @IsNotEmpty({message:"you should enter level"})
    // levelId:string;
    @IsNotEmpty({message:"you should provide a course"})
    @IsInt({message:"course id should be a number"})
    levelCourseId:number;
    @IsNotEmpty({message:'you should provide time period for the lecture'})
    timeId:string;
    @IsDate({message:'lecture Date should be of a type date'})
    @Transform(({value}:TransformFnParams)=> new Date(value))
    lectureDate:Date
}
export type getLectures = Prisma.LectureGetPayload<{
    select:{
        id:true,
        levelCourse:{
          select:{
            id:true,
            level:{
              select:{
                id:true,
                name:true
              }
            },
            course:{
              select:{
                id:true,
                name:true
              }
            }
          }
        }
        lectureTime:{
          select:{
            name:true,
            startTime:true,
            endTime:true
          }
        },
      
      },
      
}>

