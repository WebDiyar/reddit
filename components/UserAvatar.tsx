import { FC } from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Icons } from './Icons';
import Image from 'next/image';
import { User } from '@prisma/client';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className='relative aspect-square h-full w-full'>
                    <Image
                        fill
                        src={user.image}
                        alt='profile_picture'
                        sizes="(max-width: 768px) 100vw, 50vw"
                        referrerPolicy='no-referrer'
                        priority
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className='sr-only'>{user?.name}</span>
                    <Icons.user className='h-4 w-4' />
                </AvatarFallback>
            )}
        </Avatar>
    )
}

export default UserAvatar;