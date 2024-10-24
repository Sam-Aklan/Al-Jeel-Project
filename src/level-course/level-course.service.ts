import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateLevelCourseDto } from './dto/create-level-course.dto';
import { UpdateLevelCourseDto } from './dto/update-level-course.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LevelCourseService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createLevelCourseDto: CreateLevelCourseDto) {
   
      return await this.databaseService.levelCourse.create({
        data:createLevelCourseDto
      });
    
  }

  async findAll({skip,take}:{skip:number,take:number}) {
    return await this.databaseService.levelCourse.findMany({
      skip:skip,
      take:take,
      select:{
        id:true,
        level:{
          select:{
            id:true,
            levelName:true
          }
        },
        course:{
          select:{
            id:true,
            courseName:true,
          }
        }
      }
    });
  }

  // find courses by levels
  async findByLevel(levelId:string){
    try {
      
      return await this.databaseService.levelCourse.findMany({
        select:{
          id:true,
          course:{
            select:{
              courseName:true
            }
          },
          
        },
        where:{
          level:{
            id:{equals:levelId}
          }
        }
      })
    } catch (error:any) {
      console.log("error level course")
      throw new Error(error.message)
    }
  }

  async findOne(id: number) {
    return this.databaseService.levelCourse.findUnique({
      where:{
        id:id
      },select:{
        id:true,
        level:{
          select:{
            id:true,
            levelName:true,
          }
        },
        course:{
          select:{
            id:true,
            courseName:true,
          }
        }
      }
    });
  }

  async update(id: number, updateLevelCourseDto: UpdateLevelCourseDto) {
    return await this.databaseService.levelCourse.update({
      where:{
        id:id
      },
      data:updateLevelCourseDto
    });
  }

  async remove(id: number) {
    return this.databaseService.levelCourse.delete({
      where:{
        id:id
      }
    });
  }
}
