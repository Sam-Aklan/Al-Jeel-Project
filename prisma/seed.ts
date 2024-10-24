import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid'
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    console.log("🏁 seeder is started")
    const levels  = [
        {
        id:uuidv4() as string,
        levelName:"الاول ثانوي"
    },
        {
        id:uuidv4() as string,
        levelName:"الثاني ثانوي"
    },
        {
        id:uuidv4() as string,
        levelName:"الثالث ثانوي"
    },
]
const courses = [
    {
        id:uuidv4() as string,
        courseName:"الرياضيات"
    },
    {
        id:uuidv4() as string,
        courseName:"الفيزياء"
    },
    {
        id:uuidv4() as string,
        courseName:"الكيمياء"
    },
    {
        id:uuidv4() as string,
        courseName:"الاحياء"
    },
    {
        id:uuidv4() as string,
        courseName:"اللغة العربية"
    },
]
const lectureTimes = [
    {
        id:uuidv4() as string,
        lectureTimeName:"الحصة الاول",
        startTime: new Date('2024-7-2 8:00 AM UTC+0300 '),
        endTime: new Date('2024-7-2 8:45:00 AM UTC+0300')
    },
    {
        id:uuidv4() as string,
        lectureTimeName:"الحصة الثانية",
        startTime: new Date('2024-7-2 8:45 AM UTC+0300'),
        endTime: new Date('2024-7-2 9:15:00 AM UTC+0300')
    },
    {
        id:uuidv4() as string,
        lectureTimeName:"الحصة الثالثة",
        startTime: new Date('2024-7-2 9:15 AM UTC+0300'),
        endTime: new Date('2024-7-2 10:00:00 AM UTC+0300')
    },
    {
        id:uuidv4() as string,
        lectureTimeName:"الحصة الرابعة",
        startTime: new Date('2024-7-2 10:30 AM UTC+0300'),
        endTime: new Date('2024-7-2 11:15:00 AM UTC+0300')
    },
]

const teacher = [
  {
    id:uuidv4(),
    teacherName:"احمد",
    specialization:"الرياضيات"
  },
  {
    id:uuidv4(),
    teacherName:"محمد",
    specialization:"الفيزياء"
  },
  {
    id:uuidv4(),
    teacherName:"علي",
    specialization:"الكيمياء"
  },
  {
    id:uuidv4(),
    teacherName:"سعيد",
    specialization:"الاحياء"
  },
  {
    id:uuidv4(),
    teacherName:"قاسم",
    specialization:"اللغة العربية"
  },
  {
    id:uuidv4(),
    teacherName:"عمر",
    specialization:"القران الكريم"
  },
]
const levelCourses = levels.map(level=>{
  const levelCourse = courses.map(course=>(
    {levelId:level.id,courseId:course.id}
  ))
  return levelCourse
})
const flattenLevelCourses = [].concat.apply([],levelCourses)
// console.log([].concat.apply([],levelCourses))
await prisma.level.createMany(
    {data:levels}
)
console.log('levels are create successfully')
await prisma.course.createMany({data:courses})
console.log('courses are create successfully')
await prisma.lectureTime.createMany({data:lectureTimes})
console.log("lecture times are create successfully")
await prisma.teacher.createMany({data:teacher})
console.log('teachers are created successfully')
await prisma.levelCourse.createMany({data:flattenLevelCourses})
console.log('level courses are created successfully')
// console.log(flattenLevelCourses)
// console.log(new Date("2024-8-1 11:45 AM UTC+0000"))
console.log("seeder finished 🏁")

}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });