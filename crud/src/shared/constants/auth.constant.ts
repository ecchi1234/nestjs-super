export const REQUEST_USER_KEY = 'user'
export const AuthType = {
  Bearer: 'Bearer',
  APIKey: 'ApiKey',
  None: 'None',
} as const

export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType]
export type AuthTypeDecoratorPayload = {
  authTypes: AuthTypeType[]
  options: { condition: ConditionGuardType }
}

export const ConditionGuard = {
  And: 'And',
  Or: 'Or',
} as const
export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard]
