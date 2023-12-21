import { FC } from 'react';

type Props = {
    className?: string;
};
const Footer: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <footer>@This is my person page in Github - 2023</footer>
        </div>
    );
};

export default Footer;
