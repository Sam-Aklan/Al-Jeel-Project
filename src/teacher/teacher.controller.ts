import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { response } from 'express';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto,
        @Res({passthrough:true})res:typeof response) {
    return await this.teacherService.create(createTeacherDto);
    // if (error) {
    //   return res.status(500).json({message:error})
    // }
    // return res.status(201).json({message:success})
  }

  @Get()
  async findAll( @Res({passthrough:true})res:typeof response,
    @Query('skip')skip:number, 
    @Query('take')take:number) {
    return await this.teacherService.findAll({skip,take});
    // console.log(teachers[0],error)
    // if (!teachers) {
    //   res.status(500).json({message:error}).send()
    //   return 
    // }
    // res.status(200).json({message:teachers}).send()
    // return
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    const {error,teacher}= await this.teacherService.findOne(id);
    if (error) {
      throw Error(error)
    }
    return {message:teacher}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto,
  @Res({passthrough:true})res:typeof response) {
    console.log('updated')
    console.log(updateTeacherDto)
    const {success,error}= await this.teacherService.update(id, updateTeacherDto);
    if (error) {
      console.log('error message')
      res.status(500).json({message:error})
      return
    }
    
    console.log('success message',error)
    
    res.status(200).json({message:success})
  }

  @Delete(':id')
  async remove(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    console.log(id)
    const {error,success}= await this.teacherService.remove(id);
    if (!error) {
      res.status(204).json({message:success})
      return 
    }
    console.log(error)
    res.status(500).json({message:error})
    
  }
}
