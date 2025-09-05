import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import {checkTeacher} from '@/utils/checkTeacher'

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const isTeacher = await checkTeacher();
    if (isTeacher) {
      redirect('/teacher');
    }
    else{
      redirect('/student');
    }
  return (
    <></>
  );
}
