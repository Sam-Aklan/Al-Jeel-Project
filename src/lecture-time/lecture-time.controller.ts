import { Controller, Get, Post, Body, Patch, Param, Delete, Query,Res } from '@nestjs/common';
import { LectureTimeService } from './lecture-time.service';
import { CreateLectureTimeDto } from './dto/create-lecture-time.dto';
import { UpdateLectureTimeDto } from './dto/update-lecture-time.dto';
import {response} from 'express'

@Controller('lecture-time')
export class LectureTimeController {
  constructor(private readonly lectureTimeService: LectureTimeService) {}

  @Post()
  async create(@Body() createLectureTimeDto: CreateLectureTimeDto,
@Res({passthrough:true}) res: typeof response) {
    const {success,error}= await this.lectureTimeService.create(createLectureTimeDto);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(201).json({message:success})
  }

  @Get()
  async findAll(@Query('skip')skip:number,
          @Query('take')take:number,
        @Res({passthrough:true})res: typeof response) {

            if (!skip) {
              skip = 0
            }
            if (!take) {
              take = 10
            }
    const {classSessions,error}= await this.lectureTimeService.findAll({skip:skip,take:take});
    if (error) {
      res.status(500).json({message:error})
      return
    }
    console.log("inside lecture time controller")
    return classSessions
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
@Res({passthrough:true}) res:typeof response) {
    
    const {classSession,error }= await this.lectureTimeService.findOne(id);
    if (error) {
      
      return res.status(500).json({message:error})
    }
    return res.status(200).json(classSession)
  }

  @Patch(':id')
  async update(@Param('id') id: string,
   @Body() updateLectureTimeDto: UpdateLectureTimeDto,
  @Res({passthrough:true})res:typeof response) {
    const {success,error}= await this.lectureTimeService.update(id, updateLectureTimeDto);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(200).json({message:success})
  }

  @Delete(':id')
  async remove(@Param('id') id: string,
  @Res({passthrough:true}) res:typeof response
  ) {
    const {success,error} = await this.lectureTimeService.remove(id);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(204).json({message:success})
  }
}
