import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const RegisterBodySchema = z
  .object({
    email: z.email(),
    password: z.string().min(6).max(100),
    name: z.string().min(2).max(100),
    confirmPassword: z.string().min(6).max(100),
    phoneNumber: z.string().min(10).max(15),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export class RegisterBodyDto extends createZodDto(RegisterBodySchema) {}
