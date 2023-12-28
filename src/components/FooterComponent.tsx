import { FC } from 'react';

type Props = {
    className?: string;
};
const Footer: FC<Props> = () => {
    return (
        <div className="footer d-flex flex-column justify-content-center">
            <div className="d-flex flex-row w-100 justify-content-center">
                <label htmlFor="">Name: </label>
                <label htmlFor="">Anthony Doan</label>
            </div>
            <div className="d-flex flex-row w-100">
                <label htmlFor="">Address: </label>
                <label htmlFor="">Hoa Binh ward, Bien Hoa city, Dong Nai province</label>
            </div>
            <div className="d-flex flex-row w-100">
                <label htmlFor="">Email: </label>
                <label htmlFor="">bavudoan@gmail.com</label>
            </div>
            <div className="d-flex flex-row w-100">
                <label htmlFor="">Work for: </label>
                <label htmlFor="">CODE88</label>
            </div>
            <div className="d-flex flex-row w-100">
                <label htmlFor="">Work for: </label>
                <label htmlFor="">CODE88</label>
            </div>
        </div>
    );
};

export default Footer;
