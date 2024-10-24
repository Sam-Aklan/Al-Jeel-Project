import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { 
    registerDecorator, 
    ValidationOptions, 
    ValidatorConstraint,
    ValidatorConstraintInterface } from "class-validator";

export function is4long(
    validationOptions?:ValidationOptions,
    ){
        return function (object:any,propertyName:string){
            registerDecorator({
                target:object.constructor,
                propertyName:propertyName,
                options:validationOptions,
                validator:customNameValidator
            })
        }
    }

@ValidatorConstraint({name:'name',async:false})
@Injectable()
export class customNameValidator implements ValidatorConstraintInterface{
    validate(value: string, ): boolean  {
        if (value.split(' ').length ===4) {
            return true;
        }
            throw new UnprocessableEntityException('name should consist of 4 name')
        
    }
}