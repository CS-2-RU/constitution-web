import React, {useEffect, useState} from "react";
import './index.css';
import SearchModal from "../SearchModal";
import Logo from "./Logo";
import {urls} from "../../utils/urls";
import {Link} from "react-router-dom";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return(
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="header-left">
                <Logo />
            </div>
            <div className="header-right">
                <Link target="_blank" className="header-link" to={urls.reports}>Таблица отчетов</Link>
                <SearchModal />
            </div>
        </header>
    )
}

export default Header;