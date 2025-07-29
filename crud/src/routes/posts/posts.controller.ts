import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'

import { PostsService } from 'src/routes/posts/posts.service'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { CreatePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from './post.dto'

// import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
// import { APIKeyGuard } from 'src/shared/guards/api-key.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.Or })
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postsService.getPosts(userId).then((posts) => posts.map((post) => new GetPostItemDTO(post)))
  }

  @Post()
  @Auth([AuthType.Bearer])
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postsService.createPost(body, userId))
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return new GetPostItemDTO(await this.postsService.getPost(Number(id)))
  }

  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postsService.updatePost({ postId: Number(id), body, userId }))
  }

  @Delete(':id')
  @Auth([AuthType.Bearer])
  async deletePost(@Param('id') id: string, @ActiveUser('userId') userId: number): Promise<boolean> {
    return await this.postsService.deletePost({ postId: Number(id), userId })
  }
}
