import { PartialType } from '@nestjs/mapped-types';
import { CreateLectureTimeDto } from './create-lecture-time.dto';

export class UpdateLectureTimeDto extends PartialType(CreateLectureTimeDto) {}
