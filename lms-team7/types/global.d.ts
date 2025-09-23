export {}

// Create a type for the roles
export type Roles = 'teacher' | 'student' | 'admin'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}