import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'

@Module({
  controllers: [PostsController],
  providers: [PostsService, AccessTokenGuard, APIKeyGuard],
})
export class PostsModule {}
