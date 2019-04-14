import React from 'react';
import './header.css';

const logo = require('./gsLogo.png');

export const Header = () => {
    const logout = () => { window.localStorage.clear(); };
        return(
            <div className="header">
                <img src={logo}
                     className="gsLogo"
                     alt="GameSense Sports"
                     title="GameSense Sports"
                />
                <a onClick={logout} style={{float:'right'}} href='/logout'>Logout</a>
            </div>

        );
    }
    export default Header