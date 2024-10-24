import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
    @IsNotEmpty({message:"please specify the level you want to update"})
    id:string
}
