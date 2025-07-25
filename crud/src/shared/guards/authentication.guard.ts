import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AUTH_TYPE_KEY } from 'src/shared/decorators/auth.decorator'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { AuthType, AuthTypeDecoratorPayload, ConditionGuard } from 'src/shared/constants/auth.constant'

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
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypeValue = this.reflector.getAllAndOverride<AuthTypeDecoratorPayload | undefined>(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? { authTypes: [AuthType.None], options: { condition: ConditionGuard.And } }
    const guards = authTypeValue.authTypes.map((authType) => this.authTypeGuardMap[authType])

    let error = new UnauthorizedException()

    if (authTypeValue.options.condition === ConditionGuard.Or) {
      for (const guard of guards) {
        const canActivate = await Promise.resolve(guard.canActivate(context)).catch((err) => {
          error = err
          return false
        })

        if (canActivate) {
          return true
        }
      }
      throw error
    } else {
      for (const guard of guards) {
        const canActivate = await guard.canActivate(context)
        if (!canActivate) {
          throw new UnauthorizedException()
        }
      }
      return true
    }
  }
}
