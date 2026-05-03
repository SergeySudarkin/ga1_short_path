import { } from 'react';
import styles from './Header.module.css'

export const Header = ({ children }) => {

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <h1>{children}</h1>
                </div>
            </div>
        </header>
    );
};
