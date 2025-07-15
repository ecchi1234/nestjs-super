/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {
    // PrismaService is injected to interact with the database
  }

  getPosts() {
    return this.prismaService.post.findMany({})
  }

  createPost(body: any) {
    const userId = 1
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
    return { id, ...body }
  }

  deletePost(id: string) {
    return `Post with ID: ${id} deleted`
  }
}
