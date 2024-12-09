import { Link, Outlet, useNavigate } from "react-router-dom";
import React from "react";
import style from "./Home.module.css";
import woodImage from "./wood.png";


const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = (): void => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    return (
        <>
            {/* חלק עליון - סרגל ניווט
            <header>
                <nav className={style.links}>
                    <Link to="/home">
                        <dt>דף הבית</dt>
                    </Link>
                    <Link to="/about">
                        <dt>קצת עלינו</dt>
                    </Link>
                    <Link to="/order">
                        <dt>הזמנות</dt>
                    </Link>
                    <Link to="/gallery">
                        <dt>גלריה</dt>
                    </Link>
                    <Link to="/cart">
                        <dt>הסל שלי</dt>
                    </Link>
                    <a onClick={handleLogout}>
                        <dt>Logout</dt>
                    </a>
                </nav>
            </header> */}

            {/* חלק אמצעי - תמונה וכיתוב */}
            <div className={style.heroSection}>
                <img
                    src={woodImage}
                    alt="Wooden background"
                    className={style.heroImage}
                />
                <h1 className={style.heroText}>Wood and Good</h1>
            </div>

            {/* חלק תחתון - כפתור גישה עם קישורים נוספים */}
            <footer className={style.footer}>
                <div className={style.footerContent}>
                    <h3>ניווט</h3>
                    <Link to="/home">דף הבית</Link>
                    <Link to="/about">קצת עלינו</Link>
                    <Link to="/order">הזמנות</Link>
                    <Link to="/gallery">גלריה</Link>
                    <Link to="/contact">צור קשר</Link>
                    <p>📞 טלפון: 123-456-789</p>
                </div>
            </footer>

            <div className={style.content}>
                <Outlet />
            </div>
        </>
    );
};

export default Home;
