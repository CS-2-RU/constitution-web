import React from "react";
import {Link} from "react-router-dom";
import logo from './../../../media/gif/gif2.gif';
const Logo = () => {
    return(
        <Link className="header-logo" to="/">
            <img src={logo} alt=""/>
        </Link>
    )
}

export default Logo;