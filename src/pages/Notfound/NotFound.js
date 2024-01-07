import React from 'react';
import styles from './notfound.module.css';

const NotFound = () => {
    return (
        <section className={`${styles.page_404} m-5`}>
            <div className={styles.page_404_main}>
                <div className={`${styles.four_zero_four_bg}`}>
                    <h1 className='text-center text-secondary'>404</h1>
                </div>
                <div className={`${styles.contant_box_404} text-center`}>
                    <a href='/' className='btn btn-success'>
                        Go to Home
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
