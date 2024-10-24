import { Transform, TransformFnParams } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { is4long } from "./student-custom-validator";

export class CreateStudentDto {
    @IsNotEmpty({message:'provide a name'})
    @IsString({message:'wrong data type'})
    @is4long({message:"name 4"})
    name:string;
    @IsNotEmpty({message:"provide a date"})
    @IsDate({message:"provide a date"})
    @Transform(({value}:TransformFnParams)=>new Date(new Date(value).toISOString()))
    dateOfBirth:Date;
    imagePath?:string;
    @IsNotEmpty({message:"provide a level"})
    @IsString({message:""})
    levelId:string;

}

export class studentSearchDto{
    name?:string
    levelId?:string
    @IsOptional()
    @Transform(({value}:TransformFnParams)=>Math.ceil(Number(value)))
    @IsInt({message:'يجب ان يكون المدخل رقما صحيحا'})
    page?:number
    @IsOptional()
    @Transform(({value}:TransformFnParams)=>Number(value))
    @IsInt({message:'يجب ان يكون المدخل رقما صحيحا',})
    pageLimit?:number
}