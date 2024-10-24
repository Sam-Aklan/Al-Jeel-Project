import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeacherDto, teacherType } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import {v4 as uuid} from 'uuid'
import { DatabaseService } from 'src/database/database.service';
import { message } from 'src/types';

@Injectable()
export class TeacherService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createTeacherDto: CreateTeacherDto):Promise<message> {
    try {
      await this.databaseService.teacher.create({
        data:{
          id:uuid() as string,
          ...createTeacherDto
        }
      })
      return {success:"New teacher is added successfully"}
    } catch (err:any) {
      if (err.message.include('unique')) {
        throw new ConflictException
      }
      throw new Error(err.message)
    }
  }

  async findAll({skip,take}:{skip:number,take:number}){
    try {
      const teachers = await this.databaseService.teacher.findMany({
        skip:skip,
        take:take,
        select:{
          id:true,
          teacherName:true,
          specialization:true
        }
        
      })
      return {teachers}
    } catch (err) {
      return {error:"an error occured during fetching data"}
    }
  }

  async findOne(id: string) {
    try {
      const teacher = await this.databaseService.teacher.findUnique({
        where:{
          id:id
        }
      })
      return {teacher}
    } catch (err) {
      return {error:"an error occured during fetching data"}
    }
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto):Promise<message> {
    try {
      console.log(updateTeacherDto)
      await this.databaseService.teacher.update({
        where:{
          id:id
        },
        data:updateTeacherDto
      })
      return {success:'the given teacher is updated successfully'}
    } catch (err:any) {
      console.log(err.message)
      return {error:'An error occured when updating the given record'}
    }
  }

  async remove(id: string) {
    try {
      await this.databaseService.teacher.delete({
        where:{
          id:id
        }
      })
      return {success:'the given teacher is deleted successfully'}
    } catch (err:any) {
      console.log(err.message)
      return {error:'An error occured when deleting the given record'}
    }
  }
}
