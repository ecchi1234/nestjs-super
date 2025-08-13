import envConfig from 'src/shared/config'
import { RoleName } from 'src/shared/constants/role.constant'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

const prisma = new PrismaService()
const hashingService = new HashingService()

const main = async () => {
  const roleCount = await prisma.role.count()
  if (roleCount > 0) {
    throw new Error('Roles already exist in the database')
  }

  const roles = await prisma.role.createMany({
    data: [
      { name: RoleName.Admin, description: 'Administrator with full access' },
      { name: RoleName.Client, description: 'Client with limited access' },
      { name: RoleName.Seller, description: 'Seller with product management access' },
    ],
  })

  const adminRole = await prisma.role.findFirstOrThrow({
    where: { name: RoleName.Admin },
  })

  const hashedPassword = await hashingService.hash(envConfig.ADMIN_PASSWORD)

  const adminUser = await prisma.user.create({
    data: {
      email: envConfig.ADMIN_EMAIL,
      name: envConfig.ADMIN_NAME,
      password: hashedPassword,
      roleId: adminRole.id,
      phoneNumber: envConfig.ADMIN_PHONE_NUMBER,
    },
  })

  return {
    createdRoleCount: roles.count,
    adminUser,
  }
}

main()
  .then(({ adminUser, createdRoleCount }) => {
    console.log('Admin user created:', adminUser)
    console.log('Number of roles created:', createdRoleCount)
  })
  .catch(console.error)
