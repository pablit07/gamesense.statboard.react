import React from 'react';
import './header.css';

const logo = require('./gsLogo.png');

export const Header = () => {
        return(
            <div className="header">
                <img src={logo}
                     className="gsLogo"
                     alt="GameSense Sports"
                     title="GameSense Sports"
                />
            </div>

        );
    }
    export default Header