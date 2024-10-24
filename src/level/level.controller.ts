import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { response } from 'express';

@Controller('/level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  async create(@Body() createLevelDto: CreateLevelDto,
    @Res({passthrough:true})res: typeof response) {
    const {success,error} = await this.levelService.create(createLevelDto);
    if (error) {
      return res.status(500).json({message:error})
      
    }
     res.status(204).json({message:success})
  }

  @Get()
  async findAll(@Query('skip')skip:number,
      @Query('take')take:number,
    @Res({passthrough:true})res:typeof response) {
    const{error,levels} = await this.levelService.findAll({skip:skip,take:take});
    if (error) {
       res.status(500).json({message:error})
       return
    }
    // console.log(levels)
    return{levels,message:"successfully fetched data"}
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    return this.levelService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto,
  @Res({passthrough:true})res:typeof response) {
    const {success,error} = await this.levelService.update(id, updateLevelDto);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(200).json({message:success})
  }

  @Delete(':id')
  async remove(@Param('id') id: string,
  @Res({passthrough:true})res:typeof response) {
    const {error,success} = await this.levelService.remove(id);
    if (error) {
      return res.status(500).json({message:error})
    }
    return res.status(204).json({message:success})
  }
}
