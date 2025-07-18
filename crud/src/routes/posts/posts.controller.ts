import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { PostsService } from 'src/routes/posts/posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
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
