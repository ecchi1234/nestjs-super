import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from 'src/routes/auth/auth.service'
import { LoginBodyDTO, LoginResDTO, RegisterBodyDTO, RegisterResDTO } from 'src/routes/auth/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    return new RegisterResDTO(await this.authService.register(body))
  }

  @Post('login')
  async login(@Body() body: LoginBodyDTO) {
    // Implement your login logic here
    // This is just a placeholder
    return new LoginResDTO(await this.authService.login(body))
  }
}
