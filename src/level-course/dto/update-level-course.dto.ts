import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelCourseDto } from './create-level-course.dto';

export class UpdateLevelCourseDto extends PartialType(CreateLevelCourseDto) {}
