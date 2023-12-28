import { ReactNode } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponent';

interface Props {
    children: ReactNode;
}

export const TemplateLayout = (props: Props) => {
    const { children } = props;
    return (
        <div className="app-main">
            <Header />
            <div className="content d-flex flex-row">
                <div>{children}</div>
            </div>
            <Footer />
        </div>
    );
};
