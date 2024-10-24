import { PartialType } from '@nestjs/mapped-types';
import { CreateLectureDto } from './create-lecture.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLectureDto extends PartialType(CreateLectureDto) {
    // @IsNotEmpty({message:"please specify the lecture you want to update"})
    // id:string
}
