'use client';

import ProfilePic from '@/assets/images/ahmed.png';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { useDeleteUser } from '@/hook/user-management/useDeleteUser';
import { useRetrieveAdminUserProfile } from '@/hook/user-management/useRetrieveAdminUserProfile';
import { useToggleUserTwoFactor } from '@/hook/auth/useToggleUserTwoFactor';

export function UsersDetialsPage({ id }: { id: string | number }) {
  const userId = Number(id);
  const { data: profile } = useRetrieveAdminUserProfile(userId);
  const { mutateAsync: toggle2fa, isPending: isToggling } =
    useToggleUserTwoFactor();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const userInfo = [
    {
      holder: 'name',
      value: `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim(),
    },
    { holder: 'email', value: profile?.email || '-' },
    { holder: 'role', value: profile?.roles?.join(', ') || '-' },
    { holder: 'status', value: profile?.userStatus || '-' },
    {
      holder: 'last login',
      value: profile?.lastLogin
        ? new Date(profile.lastLogin).toLocaleString()
        : '-',
    },
    { holder: 'department', value: profile?.department || '-' },
  ];

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  return (
    <div>
      <div className="flex gap-4 flex-col border p-2">
        <div className=" w-full mx-auto">
          <div className=" overflow-hidden w-30 h-30 rounded-full ">
            {profile?.profileImage ? (
              <Image
                src={profile.profileImage}
                alt=""
                width={100}
                height={100}
                className="object-center w-[100px] h-[100px]"
              />
            ) : (
              <Image
                src={ProfilePic}
                alt=""
                width={100}
                height={100}
                className="object-center w-[100px] h-[100px]"
              />
            )}
          </div>
        </div>
        <div className=" flex flex-col space-y-2">
          {userInfo.map((user, i) => (
            <div className="flex justify-between items-center" key={i}>
              <span className="text-gray-500 capitalize">{user.holder}:</span>

              {user.holder === 'status' ? (
                <span
                  className={`text-xs px-2 py-0.5 border h-fit ${
                    user.value?.toLowerCase() === 'active' ||
                    user.value?.toLowerCase() === 'activated'
                      ? 'text-green-600 bg-green-50 border-green-500'
                      : 'text-gray-600 bg-gray-50 border-gray-500'
                  }`}
                >
                  {user.value}
                </span>
              ) : (
                <span className="font-bold text-right">{user.value}</span>
              )}
            </div>
          ))}

          <div className="flex gap-2 justify-between item-center">
            <span>2FA enabled:</span>
            <span>
              <Switch
                checked={Boolean(profile?.isTwoEnabled)}
                disabled={isToggling}
                onCheckedChange={async (checked) => {
                  await toggle2fa({ userId, isEnabled: checked });
                }}
              />
            </span>
          </div>
        </div>
      </div>
      <div className=" absolute bottom-4 left-1/2 -translate-x-1/2">
        <Button
          variant={'destructive'}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          Delete User
        </Button>
      </div>
    </div>
  );
}
