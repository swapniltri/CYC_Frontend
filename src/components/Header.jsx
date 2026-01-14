import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginButton, orderNowButton, anchor, header, headerDiv } from "./appliedcss/HeaderCSS.js";
import { logOutAction } from '../api/auth.js';

import Button from "../UI/Button.jsx";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.authentication);

    function handleLogInClick() {
        navigate('/auth');
    }

    function handleLogOutClick() {
        logOutAction(dispatch);
    }

    return <header className={header}>
        <div className={headerDiv}>
            <div className="flex item-center gap-2">
                <img className="h-10 w-auto" src="/images/cyc-logo.png" alt="CYC Logo" />
            </div>
            <nav className="hidden md:flex gap-6">
                <Link to="/" className={anchor}>Home</Link>
                <a href="#" className={anchor}>Menu</a>
                <a href="#" className={anchor}>About</a>
                <a href="#" className={anchor}>Nutrition</a>
                <a href="#" className={anchor}>Contact</a>
            </nav>
            <div className="flex items-center gap-4">
                {isAuthenticated === "unauthenticated" && <Button variant="outline" size="default" cssClasses="hidden md:flex !border-[#1a5e63] text-[#1a5e63] login-button-hover" onClick={handleLogInClick} >Log In</Button>}
                {isAuthenticated === "authenticated" && <Button variant="outline" size="default" cssClasses="hidden md:flex !border-[#1a5e63] text-[#1a5e63] login-button-hover" onClick={handleLogOutClick} >Log Out</Button>}
                <Button variant="default" size="default" cssClasses="!bg-[#1a5e63] order-button-hover">Order Now</Button>
            </div>
        </div>
    </header>
}