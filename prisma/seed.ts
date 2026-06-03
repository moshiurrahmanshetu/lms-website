import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { sampleInstructors, sampleCourses, sampleLessons, sampleLiveClasses } from '../src/data/sampleCourses'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')
  
  // Phase 2A: Seed Instructors as Users
  console.log('Seeding instructors...')
  
  for (const instructor of sampleInstructors) {
    // Generate email from name
    const email = instructor.name.toLowerCase().replace(' ', '.') + '@example.com'
    
    // Generate password hash
    const password = await bcrypt.hash('password123', 10)
    
    // Upsert instructor as User with INSTRUCTOR role
    await prisma.user.upsert({
      where: { id: instructor.id },
      update: {},
      create: {
        id: instructor.id,
        email,
        password,
        name: instructor.name,
        avatar: instructor.avatar,
        role: 'INSTRUCTOR',
      },
    })
    
    console.log(`✓ Seeded instructor: ${instructor.name} (${email})`)
  }
  
  // Phase 2B: Seed Courses
  console.log('Seeding courses...')
  
  for (const course of sampleCourses) {
    // Convert tags array to JSON string
    const tags = JSON.stringify(course.tags)
    
    // Convert level to enum (lowercase to uppercase)
    const level = course.level.toUpperCase() as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
    
    // Convert price to Decimal
    const price = course.price
    
    // Convert originalPrice to Decimal or null
    const originalPrice = course.originalPrice
    
    // Convert requirements array to newline-separated string
    const requirements = course.requirements.join('\n')
    
    // Convert learningObjectives array to newline-separated string
    const learningObjectives = course.learningObjectives.join('\n')
    
    // Convert targetAudience array to newline-separated string
    const targetAudience = course.targetAudience.join('\n')
    
    // Upsert course
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: {
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        longDescription: course.longDescription,
        thumbnail: course.thumbnail,
        instructorId: course.instructorId,
        category: course.category,
        tags,
        level,
        language: course.language,
        price,
        originalPrice,
        isFree: course.isFree,
        duration: course.duration,
        totalLessons: course.totalLessons,
        totalHours: course.totalHours,
        requirements,
        learningObjectives,
        targetAudience,
        enrolledCount: course.enrolledCount,
        rating: course.rating,
        reviewCount: course.reviewCount,
        featured: course.featured,
        published: course.published,
      },
    })
    
    console.log(`✓ Seeded course: ${course.title}`)
  }
  
  // Phase 2C: Seed Lessons and Lesson Resources
  console.log('Seeding lessons and resources...')
  
  for (const lesson of sampleLessons) {
    // Upsert lesson (remove nested resources array)
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      update: {},
      create: {
        id: lesson.id,
        courseId: lesson.courseId,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        content: lesson.content,
        videoUrl: lesson.videoUrl,
        videoDuration: lesson.videoDuration,
        thumbnail: lesson.thumbnail,
        order: lesson.order,
        isFree: lesson.isFree,
        isLocked: lesson.isLocked,
      },
    })
    
    console.log(`✓ Seeded lesson: ${lesson.title}`)
    
    // Seed lesson resources
    if (lesson.resources) {
      for (const resource of lesson.resources) {
        // Convert type to enum (lowercase to uppercase)
        const type = resource.type.toUpperCase() as 'PDF' | 'CODE' | 'LINK' | 'OTHER'
        
        // Convert size to BigInt (handle undefined)
        const size = resource.size ? BigInt(resource.size) : null
        
        // Upsert lesson resource
        await prisma.lessonResource.upsert({
          where: { id: resource.id },
          update: {},
          create: {
            id: resource.id,
            lessonId: lesson.id,
            title: resource.title,
            url: resource.url,
            type,
            size,
          },
        })
        
        console.log(`  ✓ Seeded resource: ${resource.title}`)
      }
    }
  }
  
  // Phase 2D: Seed Live Classes
  console.log('Seeding live classes...')
  
  for (const liveClass of sampleLiveClasses) {
    // Convert status to enum (lowercase to uppercase)
    const status = liveClass.status.toUpperCase() as 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED'
    
    // Upsert live class (remove instructorId field)
    await prisma.liveClass.upsert({
      where: { id: liveClass.id },
      update: {},
      create: {
        id: liveClass.id,
        courseId: liveClass.courseId,
        slug: liveClass.slug,
        title: liveClass.title,
        description: liveClass.description,
        scheduledAt: liveClass.scheduledAt,
        duration: liveClass.duration,
        thumbnail: liveClass.thumbnail,
        meetingUrl: liveClass.meetingUrl,
        maxCapacity: liveClass.maxCapacity,
        enrolledCount: liveClass.enrolledCount,
        status,
      },
    })
    
    console.log(`✓ Seeded live class: ${liveClass.title}`)
  }
  
  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
