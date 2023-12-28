import { ReactNode } from 'react';

interface Props {
    role?: string[];
    children: ReactNode;
}

export const EmptyLayout = ({ children }: Props) => {
    return <div>{children}</div>;
};
