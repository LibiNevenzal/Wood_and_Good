import { Link, Outlet, useNavigate} from "react-router-dom"
import React, { useContext} from "react";
// import { userContext } from "../../App";
import style from "./Layout.module.css";


const Layout = () => {
    const navigate = useNavigate();
    // const { currentUser, setCurrentUser } = useContext(userContext);
    // const userId = currentUser.id;;
    
    function handleLogout() {
        localStorage.removeItem("currentUser");
        navigate("/login");
        // setCurrentUser(null);
    }


    return (
        <><header>
            {/* <h1>Hi {currentUser.name}</h1> */}
            <nav className={style.links}>
                <Link to={`/home`} >
                    <dt>דף הבית</dt>
                </Link>
                <Link to={`/about`} >
                    <dt>קצת עלינו</dt>
                </Link>
                <Link to={`/order`} >
                    <dt>הזמנות</dt>
                </Link>
                <Link to={`/gallery`}>
                    <dt>גלריה</dt>
                </Link>
                <Link to={`/cart`} >
                    <dt>הסל שלי</dt>
                </Link>
                <a onClick={() => handleLogout()} >
                    <dt>Logout</dt>
                </a>
            </nav>
        </header>
            <div className={style.content}><Outlet /></div>
        </>
    )
}

export default Layout