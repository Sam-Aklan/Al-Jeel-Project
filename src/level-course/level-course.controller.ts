import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { LevelCourseService } from './level-course.service';
import { CreateLevelCourseDto } from './dto/create-level-course.dto';
import { UpdateLevelCourseDto } from './dto/update-level-course.dto';
import { response } from 'express';

@Controller('/level-course')
export class LevelCourseController {
  constructor(private readonly levelCourseService: LevelCourseService) {}

  @Post()
  async create(@Body() createLevelCourseDto: CreateLevelCourseDto,
        @Res({passthrough:true})res:typeof response) {
    try {
      return await this.levelCourseService.create(createLevelCourseDto);
    } catch (error:any) {
      if (error instanceof ConflictException) {
        res.status(error.getStatus()).json({message:error.message})
        return
      }
      res.status(500).json({message:error.message})
    }
  }

  @Get()
  async findAll(@Query('skip')skip:number,
          @Query('take')take:number,
         @Res({passthrough:true})res: typeof response) {
            try {
              
              return await this.levelCourseService.findAll({skip:skip,take:take,});
            } catch (error:any) {
              if (error instanceof BadRequestException) {
                throw new Error(`طلب خاطئ`)
              }
              if (error instanceof NotFoundException) {
                throw new Error ('المورد غير متوفر')
              }
              res.status(500).json('حدث خطأ')
            }
  }

  @Get('/level/:id')

  async findByLevel(@Param('id') id:string){
    try {
      return await this.levelCourseService.findByLevel(id)
    } catch (error:any) {
      console.log("error in level coourse")
      throw new Error(error.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
        @Res({passthrough:true})res:typeof response) {
    try {
      
      return await this.levelCourseService.findOne(+id);
    } catch (error:any) {
      if (error instanceof BadRequestException) {
        res.status(error.getStatus()).json({message:error.message})
        return
      }
      if (error instanceof NotFoundException) {
        res.status(error.getStatus()).json(error.message)
        return
      }
      throw new Error(error) 
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLevelCourseDto: UpdateLevelCourseDto) {
    return await this.levelCourseService.update(+id, updateLevelCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.levelCourseService.remove(+id);
  }
}
