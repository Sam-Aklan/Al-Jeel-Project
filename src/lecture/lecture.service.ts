import { Injectable } from '@nestjs/common';
import { CreateLectureDto} from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import {v4 as uuidv4} from 'uuid'
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LectureService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createLectureDto: CreateLectureDto) {
     const {id,levelCourseId,timeId,lectureDate} =  await this.databaseService.lecture.create({
        data:{
          id:uuidv4() as string,
          ...createLectureDto
        }
      })
      return{id,levelCourseId,timeId,lectureDate}
    
  }

  async findAll({skip,take,level}:{skip:number|0,take:number|10,level:string|undefined}){
    try {
      const lectures= await this.databaseService.lecture.findMany({
        skip:skip,
        take:take,
        select:{
          id:true,
          levelCourse:{
            select:{
              
              level:{
                select:{
                  
                  levelName:true
                }
              },
              course:{
                select:{
                  
                  courseName:true
                }
              }
            }
          },
          
          lectureTime:{
            select:{
              lectureTimeName:true,
              startTime:true,
              endTime:true
            }
          },
        
        },
        where:{levelCourse:{
          levelId:level
        }}
      })
      return {lectures}
    } catch (err:any) {
      return {error:"an error occured during fetching data"} 
    }
    
  }
  async findBylevel(lvlId:string){
    return await this.databaseService.lecture.findMany({
      select:{
        id:true,
        levelCourse:{
          select:{
            id:true,
            course:{
              select:{
                courseName:true,
              }
            }
          }
        },
        lectureTime:{
          select:{
            lectureTimeName:true,
            startTime:true,
            endTime:true,
            id:true
          }
        },
      lectureDate:true
      },
      where:{
        levelCourse:{levelId:{equals:lvlId}}
      }
    })
  }
  async findOne(id: string){
    try {
      const lecture = await this.databaseService.lecture.findUnique({
        where:{id:id},
        select:{
          id:true,
          levelCourse:{
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
                  courseName:true
                }
              }
            }
          },
          
          lectureTime:{
            select:{
              lectureTimeName:true,
              startTime:true,
              endTime:true
            }
          },
        lectureDate:true
        },
      })
      return{lecture}
    } catch (err:any) {
      return {error:'an error occured during fetching data'}
    }
  }

  async update(id: string, updateLectureDto: UpdateLectureDto) {
    try {
      
      await this.databaseService.lecture.update({
        where:{id:id},
        data:updateLectureDto
      })
      return {success:'the record specified is updated successfully'}
    } catch (err:any) {
      return {error:'An error occured during updating the record'}
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.lecture.delete({
        where:{id:id}
      })
      return {success:'the lecture is deleted successfully'}  
    } catch (err:any) {
      return {error:"faild to delete the lecture specified, check if it still exists"} 
    }
  }
}
