import Image from 'next/image';

export default function ProfileInfo({ user }) {
  const userFollowers = user.followers.length;
  const userFollowing = user.following.length;

  return (
    <>
      <div id="info" className="relative">
        <div id='banner' className="w-full h-48 relative">
          <Image
            src={user.cover_img || '/cover.jpg'}
            alt="Banner do Perfil"
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />
        </div>

        <div
          id='profile-image'
          className="absolute top-32 left-4 w-[100px] h-[100px] overflow-hidden rounded-full"
          style={{ border: '4px solid white' }} // Opcional, para destacar a borda
        >
          {user.profile_img ? (
            <Image
              src={user.profile_img}
              alt="Foto de Perfil"
              width={100}
              height={100}
              className="rounded-full object-cover w-full h-full"
              priority
            />
          ) : (
            <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
              <Image
                src="/defaultuser.png"
                alt="Foto de Perfil"
                width={100}
                height={100}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>
          )}
        </div>

        <div id="content" className="mt-16 px-4">
          <h1 className="text-xl font-bold">{user.full_name}</h1>
          <p className="font-thin mb-4">@{user.username}</p>
          <p className="mb-2">Bio: {user.bio}</p>

          <div id="follow-numbers" className="flex flex-row gap-4 text-sm mb-4 font-semibold">
            <div id="following" className="flex flex-row gap-1">
              {userFollowing}
              <p className='font-thin '>Following</p>
            </div>

            <div id="followers" className="flex flex-row gap-1">
              {userFollowers}
              <p className='font-thin '>Followers</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
