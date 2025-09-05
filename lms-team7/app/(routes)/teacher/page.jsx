import {checkTeacher} from '@/utils/checkTeacher'
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server'

export default async function page() {
  const isTeacher = await checkTeacher();
  if (!isTeacher) {
    redirect('/');
  }
  return (
    <div>teacher page</div>
  )
}
