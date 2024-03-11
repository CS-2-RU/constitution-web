import React, {useEffect, useState} from "react";
import './index.css';
import SearchModal from "../SearchModal";
import Logo from "./Logo";

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
            <Logo />
            <SearchModal />
        </header>
    )
}

export default Header;