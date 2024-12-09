import { useState } from 'react';
import { toggleFollowUser } from '../../../../../services/userServices';

export default function FollowButton({ id, followStatus }) {

  const [isFollowing, setIsFollowing] = useState(followStatus);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const data = await toggleFollowUser(id);
      setIsFollowing(data.following);
      
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={`px-4 py-2 font-semibold rounded-md focus:outline-none focus:ring-2 
                ${ isFollowing
                ? 'bg-slate-700 text-white hover:bg-slate-600 focus:ring-red-400'
                : 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-blue-400'
                }
                ${loading && 'opacity-50 cursor-not-allowed'}
                `}
    >
      {loading ? 'Processando...' : isFollowing ? 'Deixar de Seguir' : 'Seguir'}
    </button>
  );
}
