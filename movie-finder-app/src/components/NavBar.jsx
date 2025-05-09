import { Link, useLocation } from "react-router-dom";
import "../css/NavBar.css";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";

function NavBar() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { darkMode } = useTheme();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Close mobile menu when route changes
        setMenuOpen(false);
    }, [location]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            setUser(null);
            toast.success("User logged out");
        } catch (error) {
            console.error("Error signing out: ", error);
            toast.error("Error signing out");
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const isActive = (path) => {
        return location.pathname === path ? "nav-link active" : "nav-link";
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}>
            <div className="navbar-brand">
                <Link to="/">HyperMovies</Link>
            </div>
            
            <button className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            
            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <Link to="/" className={isActive('/')}>Home</Link>
                <Link to="/favourites" className={isActive('/favourites')}>Favourites</Link>
                <ThemeToggle />
                
                {!user ? (
                    <>
                        <Link to="/login" className={isActive('/login')}>Login</Link>
                        <Link to="/register" className={isActive('/register')}>Register</Link>
                    </>
                ) : (
                    <button className="nav-link logout-button" onClick={handleSignOut}>
                        <FaSignOutAlt /> <span className="logout-text">Logout</span>
                    </button>
                )}
            </div>
        </nav>
    );
}

export default NavBar;