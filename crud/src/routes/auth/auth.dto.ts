import { Exclude } from 'class-transformer'
import { IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator.decorator'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  @Length(6, 20, { message: 'Mật khẩu phải từ 6 đến 20 ký tự' })
  password: string
}

export class LoginResDTO {
  @IsString()
  accessToken: string
  @IsString()
  refreshToken: string

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString({ message: 'Tên phải là một chuỗi' })
  name: string

  @IsString()
  @Match('password', {
    message: 'Mật khẩu xác nhận không khớp với mật khẩu',
  })
  confirmPassword: string
}

export class RegisterResDTO {
  id: number
  email: string
  name: string
  @Exclude()
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial)
  }
}

export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class RefreshTokenResDTO extends LoginResDTO {}

export class LogoutBodyDTO extends RefreshTokenBodyDTO {}

export class LogoutResDTO {
  message: string

  constructor(partial: Partial<LogoutResDTO>) {
    Object.assign(this, partial)
  }
}
