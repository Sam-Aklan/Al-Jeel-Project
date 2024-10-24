import { Prisma } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateLevelDto {
    @IsNotEmpty({message:"provide a name for the level"})
    levelName:string;
}

export type levelType = Prisma.LevelGetPayload<{}>