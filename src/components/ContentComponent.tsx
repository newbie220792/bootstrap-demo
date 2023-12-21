import React, { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
}>;
const ContentComponent: FC<Props> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
};

export default ContentComponent;
