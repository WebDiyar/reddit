'use client';

import { signIn } from 'next-auth/react';
import * as React from 'react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Icons } from './Icons';
import { cn } from '@/lib/utils';

const UserAuthForm: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            const result = await signIn('google', { callbackUrl: '/' });
            if (!result?.error) {
                // successful login
                toast({
                    title: 'Success',
                    description: 'Logged in successfully.',
                    variant: 'destructive',
                });
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast({
                title: 'Error',
                description: 'There was an error logging in with Google.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Button
                isLoading={isLoading}
                type='button'
                size='sm'
                className='w-full'
                onClick={loginWithGoogle}
                disabled={isLoading}
            >
                {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
                Google
            </Button>
        </div>
    );
};

export default UserAuthForm;