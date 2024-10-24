import { Controller, Get, Post, Body, Patch, Param, Delete, Query,Res, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { response } from 'express';

@Controller('/lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  async create(@Body() createLectureDto: CreateLectureDto,
        @Res({passthrough:true})res:typeof response) {
    try {
      
      return await this.lectureService.create(createLectureDto);
    } catch (error:any) {
      if (error instanceof ConflictException) {
        res.status(error.getStatus()).json('هذا المدخل موجود مسبقا')
        return
      }
      res.status(500).json('حدث خطا')
    }
      
    
  }

  @Get()
  async findAll(@Query('skip')skip:number,
          @Query('take')take:number,
          @Query('level') level:string|undefined,
          @Res({passthrough:true})res:typeof response) {
    const {error,lectures} = await this.lectureService.findAll({skip,take,level});
    if (error) {
       res.status(500).json({message:error})
       return
    }
     res.status(200).json({message:lectures})
  }
// lectures by level
  @Get('/level/:id')
  async findBylevel (@Param('id') id:string,
                    @Res({passthrough:true})res:typeof response){
    try {
      console.log(id)
      return await this.lectureService.findBylevel(id)
    } catch (error:any) {
      if(error instanceof BadRequestException){
        res.status(error.getStatus()).json('تم ارسال الطلب بشكل خطا')
        return
      }
      if (error instanceof NotFoundException) {
        console.log('not found exception')
        res.status(404).json('لم يتم العثور على المورد المطلب')
        return
      }
      res.status(500).json('حدث خطا')
    }
  }

  @Get('/lecture:id')
  async findOne(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    const {error,lecture} = await this.lectureService.findOne(id);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(200).json({message:lecture})
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto,
  @Res({passthrough:true})res:typeof response) {
    const {error,success} = await this.lectureService.update(id, updateLectureDto);
    if (error) {
      return res.status(500).json({message:error})
    }
    return {message:success}
  }

  @Delete(':id')
  async remove(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    const {error,success} = await this.lectureService.remove(id);
    if (error) {
      res.status(500).json({message:error})
      return
    }
    res.status(201).json({message:success})
  }
}
