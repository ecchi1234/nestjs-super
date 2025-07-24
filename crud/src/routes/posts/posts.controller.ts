import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common'
import { PostsService } from 'src/routes/posts/posts.service'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(APIKeyGuard) // Assuming APIKeyGuard is also needed for this route
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body)
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id)
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePost(id, body)
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id)
  }
}
