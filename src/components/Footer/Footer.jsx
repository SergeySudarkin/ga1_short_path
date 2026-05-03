import { } from 'react';
import styles from './Footer.module.css'

export const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <p>Сударкин Сергей Вячеславович</p>
                    <p>E-mail: <a href="mailto:s.sudarkin@mail.ru">s.sudarkin@mail.ru</a></p>
                    <p>Ссылка на курс: <a href="https://online.mospolytech.ru/course/view.php?id=14927" target='_blank'>Теоретические основы искусственного интеллекта</a></p>
                    <p>Год разработки: 2026</p>
                </div>
            </div>
        </footer>
    );
};
