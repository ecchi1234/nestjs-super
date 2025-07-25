import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from 'src/shared/types/jwt.type'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant'

export const ActiveUser = createParamDecorator((field: keyof TokenPayload | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>()
  const user: TokenPayload | undefined = request[REQUEST_USER_KEY] as TokenPayload

  return field ? user?.[field] : user
})
