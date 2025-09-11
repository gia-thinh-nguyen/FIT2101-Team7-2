import {checkTeacher} from '@/utils/checkTeacher'
import { redirect } from 'next/navigation';
import TeacherDashboard from '@/components/TeacherDashboard';

export default async function page() {
  const isTeacher = await checkTeacher();
  if (!isTeacher) {
    redirect('/');
  }
  return (
    <div><TeacherDashboard /></div>
  )
}
