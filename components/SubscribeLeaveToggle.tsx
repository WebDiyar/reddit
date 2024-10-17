'use client'
import { FC, startTransition } from 'react'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import { useToast } from '../hooks/use-toast';
import axios, { AxiosError } from 'axios';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps { 
    subredditId: string;
    subredditName: string;
    isSubscribed: boolean
};

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ subredditId, subredditName, isSubscribed }) => {
    const { toast } = useToast()
    const { loginToast } = useCustomToasts();
    const router = useRouter();

    const { mutate: subscribe, isPending: isSubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }

            const { data } = await axios.post("/api/subreddit/subscribe", payload);
            return data as string;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    return loginToast();
                }
            }

            return toast({
                title: 'There was a problem.',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh();
            });

            toast({
                title: 'Subscribed!',
                description: `You are now subscribed to r/${subredditName}`,
            });
        }
    });

    const { mutate: unsubscribe, isPending: isUnsubLoading } = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }

            const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
            return data as string
        },
        onError: (error: AxiosError) => {
            toast({
                title: 'Error',
                description: error.response?.data as string,
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                router.refresh()
            })
            toast({
                title: 'Unsubscribed!',
                description: `You are now unsubscribed from/${subredditName}`,
            })
        },
    });
    
    return isSubscribed ? (
        <Button
            isLoading={isUnsubLoading}
            onClick={() => unsubscribe()}
            className='w-full mt-1 mb-4'>
            Leave community
        </Button>
    ) : 
        <Button
            isLoading={isSubLoading}
            onClick={() => subscribe()}
            className='w-full mt-1 mb-4'>
            Join to post
        </Button>
    
}

export default SubscribeLeaveToggle
