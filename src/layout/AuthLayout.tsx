import { ReactNode } from 'react';
import { TemplateLayout } from '../components/TemplateLayout';

interface Props {
    role?: string[];
    children: ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <>
            <TemplateLayout>{children}</TemplateLayout>
        </>
    );
};
