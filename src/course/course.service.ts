import { Injectable } from '@nestjs/common';
import { CreateCourseDto, courseType } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Prisma } from '@prisma/client';
import {v4 as uuidv4} from 'uuid'
import { DatabaseService } from 'src/database/database.service';
type message = {
  success?:string,
  error?:string
}
@Injectable()
export class CourseService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createCourseDto: CreateCourseDto):Promise<message> {
    try {
      
       await this.databaseService.course.create({
        data:{id:uuidv4() as string,...createCourseDto}
        })
      return {success:"course created successfully"}
    } catch (err:any) {
      if(err.message.include('unique')){
        return {error:"the course already exists"}
      }
      return {error:"an error occured during the creation of the course"}
    }
  }

  async findAll({skip,take}:{skip:number|0,take:number|10}):Promise<courseType[]|message> {
    try {
      
      const courses = await this.databaseService.course.findMany({
        skip:skip,
        take:take,
        
      })
      return courses
    } catch (err) {
      return {error:'an error occured during fetching course data'}
    }
    
  }

  async findOne(id: string):Promise<courseType|message> {
    try {
      
      const course = await this.databaseService.course.findUnique({
        where:{
          id:id
        }
      })
      return course
    } catch (err) {
      return {error:"not able to fetch the course specified"}
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto):Promise<message> {
    try {
      await this.databaseService.course.update({
        where:{id:id},
        data:updateCourseDto
      })
      return {success:'the course specified is update successfully'}
    } catch (err:any) {
      return {error:"an error occured during updating the course"}
    }
  }

  async remove(id: string):Promise<message> {
    try {
      
      await this.databaseService.course.delete({
        where:{
          id:id
        }
      })
      return {success:"the course is deleted"}
    } catch (err) {
      return {error:"an error occured during deleting the course"}
    }
  }
}
