import { FC } from 'react';

type Props = {
    className?: string;
};
const Header: FC<Props> = () => {
    return <div className="header">This is header</div>;
};

export default Header;
