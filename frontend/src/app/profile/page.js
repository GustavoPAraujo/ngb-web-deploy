
import Profile from '@/components/pages/profile/profile.js';
import { getLoggedUserData } from '../../../services/userServices';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  
  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt')?.value;

  if (!jwt) {
    redirect('/auth/login');
  }

  try {
    const user = await getLoggedUserData(jwt);

    if (!user) {
      redirect('/auth/login');
    }

    return (
      <div>
        <Profile user={user} isLogged={true} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao obter os dados do usuário:', error);
    redirect('/auth/login');
  }
}
