import React, { FC } from 'react';

type Props = {
    className?: string;
};
const HeaderComponent: FC<Props> = ({ className }) => {
    return <div className={className}>This is header</div>;
};

export default HeaderComponent;
