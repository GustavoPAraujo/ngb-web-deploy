import { getUserProfile } from '../../../../services/userServices';
import { getLoggedUserData } from '../../../../services/userServices';
import { redirect } from 'next/navigation';
import Profile from '@/components/pages/profile/profile.js';
import { cookies } from 'next/headers';

export default async function UserProfilePage({ params }) {
  const { username } = await params;

  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt')?.value;

  const isLoggedUser = await getLoggedUserData(jwt);

  if (isLoggedUser === username) {
    redirect('/profile');
  }

  try {
    const userProfile = await getUserProfile(username);

    if (!userProfile || !userProfile.user) {
      console.error('Perfil não encontrado ou resposta inválida:', userProfile);
      redirect('/');
    }

    return (
      <div>
        <Profile user={userProfile.user} isLogged={false} isFollowed={userProfile.is_following} />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar o perfil do usuário: ', error);
    redirect('/');
  }
}
