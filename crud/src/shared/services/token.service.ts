import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import envConfig from 'src/shared/config'
import { TokenPayload } from '../types/jwt.type'
import { randomUUID } from 'crypto'

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: { userId: number }) {
    // Implement your token signing logic here
    return this.jwtService.sign(payload, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
      expiresIn: envConfig.ACCESS_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
      jwtid: randomUUID(), // Generate a unique identifier for the token
    })
  }

  signRefreshToken(payload: { userId: number }) {
    // Implement your refresh token signing logic here
    return this.jwtService.sign(payload, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
      expiresIn: envConfig.REFRESH_TOKEN_EXPIRES_IN,
      algorithm: 'HS256',
      jwtid: randomUUID(), // Generate a unique identifier for the token
    })
  }

  verifyAccessToken(token: string): Promise<TokenPayload> {
    // Implement your access token verification logic here
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.ACCESS_TOKEN_SECRET,
    })
  }

  verifyRefreshToken(token: string): Promise<TokenPayload> {
    // Implement your refresh token verification logic here
    return this.jwtService.verifyAsync(token, {
      secret: envConfig.REFRESH_TOKEN_SECRET,
    })
  }
}
