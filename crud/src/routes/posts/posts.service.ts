import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreatePostBodyDTO, UpdatePostBodyDTO } from './post.dto'
import { isNotFoundPrismaError } from 'src/shared/helpers'

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

  createPost(body: CreatePostBodyDTO, userId: number) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      include: {
        author: {
          omit: { password: true },
        },
      },
    })
  }

  async getPost(id: number) {
    try {
      const post = await this.prismaService.post.findUniqueOrThrow({
        where: {
          id: id,
        },

        include: {
          author: {
            omit: { password: true }, // Exclude sensitive fields
          },
        },
      })

      return post
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  async updatePost({ postId, body, userId }: { postId: number; body: UpdatePostBodyDTO; userId: number }) {
    try {
      const post = await this.prismaService.post.update({
        where: {
          id: postId,
          authorId: userId, // Ensure the user is the author of the post
        },
        data: {
          title: body.title,
          content: body.content,
        },
        include: {
          author: {
            omit: { password: true },
          },
        },
      })

      return post
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found or you do not have permission to update this post')
      }
      throw error
    }
  }

  async deletePost({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prismaService.post.delete({
        where: {
          id: postId,
          authorId: userId,
        },
      })
      return true
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found or you do not have permission to delete this post')
      }
      throw error
    }
  }
}
