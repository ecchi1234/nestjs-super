import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {
    // PrismaService is injected to interact with the database
  }

  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },

      include: {
        author: {
          omit: { password: true }, // Exclude sensitive fields
        },
      },
    })
  }

  createPost(body: any, userId: number) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
  }

  getPost(id: string) {
    return `Post with ID: ${id}`
  }

  updatePost(id: string, body: any) {
    return `Post with ID: ${id} updated with title: ${body.title} and content: ${body.content}`
  }

  deletePost(id: string) {
    return `Post with ID: ${id} deleted`
  }
}
