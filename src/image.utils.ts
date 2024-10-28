import { BadRequestException, UnprocessableEntityException } from "@nestjs/common"
import { Request } from "express"
import { FILE_UPLOADS_DIR } from "./constants"
import * as fs from 'fs'
import { join } from "path"
import { firestore } from "./firebase.config"
import { deleteObject, ref } from "firebase/storage"

export const filenameEditor = (req:Request,file:Express.Multer.File, callback:(error:Error|null,filename:string)=>void)=>{
    const newFileName = new Date().toISOString().replace(/:/g, '-')+"_" + file.originalname
    // console.log("*** file location ****")
    // console.log(FILE_UPLOADS_DIR)
    // console.log(newFileName)
    callback(null,newFileName)
}
export const imageFileFilter = (req:Request,file:Express.Multer.File, callback:(error:Error|null,valid:boolean)=>void)=>{
    if (!file.originalname || !file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return callback( new BadRequestException('file must be of type jpg|jpeg|png'),false)
    }
    return callback(null,true)
}

export const firebaseEditor = (file:Express.Multer.File)=>{
    const newFileName = new Date().toISOString().replace(/:/g, '-')+"_" + file.originalname
    return newFileName
}

export const imageDeleteFn = (oldPhotoPath:string)=>{
    const oldPath = join(FILE_UPLOADS_DIR,oldPhotoPath)
    if (fs.existsSync(oldPath)) {
        fs.unlink(oldPath,(err)=>{
            if(err) throw new Error('failed to remove previous image')
        })
    return
    }
    throw new UnprocessableEntityException(`file dose not exists ${oldPath}`)
}

export const firebaseDeleteFn = (oldPhotoPath:string)=>{
    const imageRef = ref(firestore,oldPhotoPath)
    deleteObject(imageRef).then(()=> console.log("image deleted successfully")).catch(error=>{
        throw new Error(error.message)
    })
}