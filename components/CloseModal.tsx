'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Button } from './ui/button';

interface CloseModalProps {
    onClose: () => void;
}

const CloseModal: FC<CloseModalProps> = ({ onClose }) => {
    const router = useRouter();

    const handleClose = () => {
        onClose(); 
        router.push('/');
    };

    return (
        <Button
            variant='default'
            className='h-6 w-6 p-0 rounded-md'
            onClick={handleClose}
        >
            <X aria-label='close modal' className='h-4 w-4' />
        </Button>
    );
};

export default CloseModal;
