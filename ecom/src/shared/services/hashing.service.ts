import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcrypt'

const saltRounds = 10

@Injectable()
export class HashingService {
  hash(value: string) {
    // Implement your hashing logic here
    return hash(value, saltRounds)
  }

  compare(value: string, hashedValue: string) {
    // Implement your comparison logic here
    return compare(value, hashedValue)
  }
}
