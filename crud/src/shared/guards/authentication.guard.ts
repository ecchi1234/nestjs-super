import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AUTH_TYPE_KEY } from 'src/shared/decorators/auth.decorator'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { AuthType } from 'src/shared/constants/auth.constant'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private readonly authTypeGuardMap: Record<string, CanActivate>
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly apiKeyGuard: APIKeyGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.APIKey]: this.apiKeyGuard,

      [AuthType.None]: {
        canActivate: () => true,
      },
    }
  }
  canActivate(context: ExecutionContext): boolean {
    const authTypeValue = this.reflector.getAllAndOverride<boolean>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    console.log('authTypeValue', authTypeValue)
    return true
  }
}
