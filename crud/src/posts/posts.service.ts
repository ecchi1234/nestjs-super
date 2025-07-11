import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts() {
    return 'All posts'
  }

  createPost(body: any) {
    return body
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
