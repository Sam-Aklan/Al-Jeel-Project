import { Injectable } from '@nestjs/common';
import { CreateStudentDto, studentSearchDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DatabaseService } from 'src/database/database.service';
import {v4 as uuid} from 'uuid'
import { applyFilters } from 'src/filters.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly databaseService:DatabaseService){}
  async create(createStudentDto: CreateStudentDto) {
    
    return await this.databaseService.student.create({data:{id:uuid() as string,
      dateOfBirth:new Date(createStudentDto.dateOfBirth),
      imagePath:createStudentDto.imagePath,
      levelId:createStudentDto.levelId,
      name:createStudentDto.name,
      }});
    
  }

  async findAll(params:studentSearchDto) {
    let {page ,pageLimit,levelId} = params
    if(!page) page = 1
    if(!pageLimit) pageLimit = 2
    console.log(page,pageLimit,levelId)
    const {whereBuilder} = await applyFilters<Prisma.StudentWhereInput>({
      appliedFiltersInput:params,
      availableFilters:{
        name: async({filter})=>{
          // console.log("filter: ",filter)
         return{ 
          where:{
            name:{
              contains:String(filter),
            }
          }}
        },
        levelId : async({filter})=>{
          return{
            where:{
              levelId:{
                equals:filter as string
              }
            }
          }
        },
        // level: async({filter})=>{
        //   return{
        //     where:{
        //       level:{
        //         id:{
        //           in:[filter]
        //         }
        //       }
        //     }
        //   }
        // }
      }
    })
    const totalCount = await this.databaseService.student.count({
      where:whereBuilder
    })
    const students = await this.databaseService.student.findMany({
      skip:+page ===1?0:(+page -1) *pageLimit,
      take:+pageLimit ,
      select:{
        id:true,
        name:true,
        imagePath:true||null,
        dateOfBirth:true,
        level:{
          select:{
            id:true,
            levelName:true
          }
        },
        
      },
      where:whereBuilder,
      
      
    });
    return {
      students,
      totalCount,
      prevouisPage: +page > 1 ? (+page -1) :null,
      isNext: (+page  * +pageLimit ) < totalCount? true : false,
      currentPage: +page 
    }
  }

  async findOne(id: string) {
    return await this.databaseService.student.findUnique({
      where:{id:id}
    })
  }

  async update(id: string, updateStudentDto: UpdateStudentDto,) {
    if(updateStudentDto.dateOfBirth) updateStudentDto.dateOfBirth = new Date(updateStudentDto.dateOfBirth)
      try {
        console.log(updateStudentDto)
    return await this.databaseService.student.update({
      where:{id:id},
      data:{levelId:updateStudentDto.levelId,
        imagePath: updateStudentDto.imagePath === null?undefined:updateStudentDto.imagePath,
        ...updateStudentDto
      }
    })
      } catch (err:any) {
        throw  new Error(err.message)
      }
  }

  async remove(id: string) {
    return await this.databaseService.student.delete({where:{id:id}});
  }
}
