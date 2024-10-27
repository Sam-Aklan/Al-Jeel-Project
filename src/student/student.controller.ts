import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, ConflictException, Res, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, studentSearchDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { filenameEditor, imageDeleteFn, imageFileFilter } from 'src/image.utils';
import { FILE_UPLOADS_DIR } from 'src/constants';
import { diskStorage } from 'multer';
import { response } from 'express';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @UseInterceptors(FileInterceptor('image',{
    storage:diskStorage({
      filename:filenameEditor,
      destination:(req,file,cb)=>cb(null,FILE_UPLOADS_DIR),
    }),
    limits:{
      fileSize: 1024 * 1024 * 2
    },
    fileFilter:imageFileFilter
  }))
  @Post()
  async create(
        @Body() createStudentDto: CreateStudentDto,
        @UploadedFile()image:Express.Multer.File,
        @Res({passthrough:true})res:typeof response) {
          try {
            if(image) createStudentDto.imagePath = image.filename
            
            return await this.studentService.create(createStudentDto);
          } catch (err:any) {
            if (err instanceof ConflictException) {
              res.status(err.getStatus()).json("this instance already exists")
              return
            }
            console.log("deleting the uploaded image")
            imageDeleteFn(image.filename)
            throw new Error(err.message)
          }
  }

  @Get()
  async findAll(
    @Query()params:studentSearchDto,
  ) {
    console.log("incoming params",params)
    try {
      
      const students = await this.studentService.findAll(params);
      return students
    } catch (error:any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }
  @UseInterceptors(FileInterceptor('updatedImage',{
    storage:diskStorage({
      filename:filenameEditor,
      destination:(req,file,cb)=>cb(null,FILE_UPLOADS_DIR),
    }),
    limits:{
      fileSize: 1024 * 1024 * 2
    },
    fileFilter:imageFileFilter
  }))
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateStudentDto: UpdateStudentDto,
    @UploadedFile()updatedImage?:Express.Multer.File
    ) {
      // console.log(`updatedStud: ${updateStudentDto.oldImage}`)
      // console.log('updated image: ', updatedImage)
      // console.log(updateStudentDto)
      // if(!updatedImage){
      //   return this.studentService.update(id,updateStudentDto)
      // }
      if (updatedImage &&updateStudentDto.oldImage) {
        try {
          console.log("**** first if****")
          imageDeleteFn(updateStudentDto.oldImage)
          updateStudentDto.oldImage = undefined
          updateStudentDto.imagePath = updatedImage.filename
          console.log("****** update image *******")
          console.log(updateStudentDto.imagePath)
          return this.studentService.update(id,updateStudentDto)
        } catch (err:any) {
          console.log("deleting updated image")
          console.log(updatedImage.filename)
          imageDeleteFn(updatedImage.filename)
          throw new Error(err.message)
        }
      }
      if(updateStudentDto.oldImage && !updatedImage){
        console.log("deleteing old image")
        imageDeleteFn(updateStudentDto.oldImage)
        try {
          updateStudentDto.oldImage = undefined
          updateStudentDto.imagePath = null
          return this.studentService.update(id,updateStudentDto)
        } catch (err:any) {
          throw new Error(err.message)
        }
      }
      if(updatedImage && !updateStudentDto.oldImage){
        updateStudentDto.imagePath = updatedImage.filename
        console.log("update image no old: ", updateStudentDto.imagePath)
        console.log(updatedImage.filename)
      }
      // updateStudentDto.imagePath = updatedImage.filename
      // console.log("final block: ", updatedImage)
      try {
        console.log("final block: *****")
        console.log(updatedImage.filename)
        updateStudentDto.oldImage = undefined
        return this.studentService.update(id, updateStudentDto);
      } catch (err:any) {
        if(updatedImage)imageDeleteFn(updatedImage.filename)
        throw new Error(err.message)
      }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('oldImage')oldImage?:string) {
      
      if (oldImage) {
        try {
          console.log(oldImage)
          imageDeleteFn(oldImage)
        } catch (err:any) {
          throw err
        }
      }
    return await this.studentService.remove(id);
  }
}
