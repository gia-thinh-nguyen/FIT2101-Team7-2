import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const checkTeacher = async() =>{
    const {sessionClaims} = await auth()
    return sessionClaims?.metadata?.role === 'teacher'
}
