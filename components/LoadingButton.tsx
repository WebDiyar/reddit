import { Button as ShadButton, ButtonProps } from './ui/button';
import { Icons } from './Icons';
import { FC } from 'react';

interface LoadingButtonProps extends ButtonProps {
    isLoading?: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({ isLoading, children, ...props }) => {
    return (
        <ShadButton {...props} disabled={isLoading || props.disabled}>
            {isLoading ? <Icons.spinner className="animate-spin h-4 w-4 mr-2" /> : children}
        </ShadButton>
    );
};

export default LoadingButton;
