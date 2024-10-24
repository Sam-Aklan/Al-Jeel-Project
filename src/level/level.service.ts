import { Injectable } from '@nestjs/common';
import { CreateLevelDto, levelType } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { DatabaseService } from 'src/database/database.service';
import {v4 as uuid} from 'uuid'
import { message } from 'src/types';

@Injectable()
export class LevelService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createLevelDto: CreateLevelDto):Promise<message> {
    try {
      
      await this.databaseService.level.create({
        data:{id:uuid() as string,...createLevelDto}
      })
      return {success:'a level is created successfully'}
    } catch (err:any) {
      if (err.message.include('unique')) {
        return {error:"this level already exists"}
      }
      return {error:" an error occured during creating the given level"}
    }
  }

  async findAll({skip,take}:{skip:number,take:number}) {
    try {
      const levels = await this.databaseService.level.findMany({
        skip:skip,
        take:take,
        select:{
          id:true,
          levelName:true
        }
      })
      return {levels}
    } catch (err) {
      return {error:"an error occured during fetching data"}
    }
  }

  async findOne(id: string) {
    try {
      const level = await this.databaseService.level.findUnique({
        where:{id:id}
      })
      return {level}
    } catch (err) {
      return {error:" an error occured during fetching a given level"}
    }
  }

  async update(id: string, updateLevelDto: UpdateLevelDto) {
    try {
      await this.databaseService.level.update({
        where:{
          id:id
        },
        data:updateLevelDto
      })
      return {success:'the given level is updated successfully'}
    } catch (err) {
      return {error:'An error occured when updating the given record'}
    }
  }

  async remove(id: string){
    try {
      await this.databaseService.level.delete({
        where:{
          id:id
        }
      })
      return {success:'the given level is deleted successfully'}
    } catch (err) {
      return {error:'An error occured when deleting the given record'}
    }
  }
}
