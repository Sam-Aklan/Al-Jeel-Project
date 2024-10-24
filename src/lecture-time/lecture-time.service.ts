import { Injectable } from '@nestjs/common';
import { CreateLectureTimeDto, lectureTimeType } from './dto/create-lecture-time.dto';
import { UpdateLectureTimeDto } from './dto/update-lecture-time.dto';
import { DatabaseService } from 'src/database/database.service';
import {v4 as uuid} from 'uuid'
import { message } from 'src/types';
import { Sql } from '@prisma/client/runtime/library';
@Injectable()
export class LectureTimeService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createLectureTimeDto: CreateLectureTimeDto): Promise<message> {
    try {
      
      await this.databaseService.lectureTime.create({
        data:{id:uuid() as string,...createLectureTimeDto}
      })
      return {success:'a class session is created successfully'}
    } catch (err:any) {
      if (err.message.include('unique')) {
        return {error:"this class session already exists"}
      }
      return {error:" an error occured during creating the given lecture time"}
    }
  }

  async findAll({skip,take}:{skip:number,take:number}){
    try {
      const classSessions = await this.databaseService.lectureTime.findMany({
        skip:skip,
        take:take,
        select:{
          id:true,
          lectureTimeName:true,
          startTime:true,
          endTime:true
        },
        orderBy:{
          startTime: 'asc'
        }
      })
      return {classSessions:classSessions}
    } catch (err:any) {
      console.log(err.message)
      return {error:"an error occured during fetching data"}
    }
  }

  async findOne(id: string) {
    try {
      const classSession = await this.databaseService.lectureTime.findUnique({
        where:{id:id}
      })
      return {classSession}
    } catch (err) {
      return {error:" an error occured during fetching a given lecture time"}
    }
  }

  async update(id: string, updateLectureTimeDto: UpdateLectureTimeDto):Promise<message> {
    try {
      await this.databaseService.lectureTime.update({
        where:{
          id:id
        },
        data:updateLectureTimeDto
      })
      return {success:'the given class session is updated successfully'}
    } catch (err) {
      return {error:'An error occured when updating the given record'}
    }
  }

  async remove(id: string):Promise<message> {
    try {
      await this.databaseService.lectureTime.delete({
        where:{
          id:id
        }
      })
      return {success:'the given class session is deleted successfully'}
    } catch (err) {
      return {error:'An error occured when deleting the given record'}
    }
  }
}
