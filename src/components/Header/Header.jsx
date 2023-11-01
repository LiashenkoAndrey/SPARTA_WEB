import React from 'react';
import logo from '../../assets/img/logo.png'
import './Header.css'
import {useTelegram} from "../../hooks/useTelegram";
import close from '../../assets/img/removeBtn.svg'

const Header = () => {
    const {onClose} = useTelegram();

    return (
        <div className={"Header"}>
            <div className={"logoWrapper"}>
                <img src={logo} width={120} alt=""/>
            </div>
            <img src={close} style={{width: 50, padding: 13}} onClick={onClose} alt=""/>
        </div>
    );
};

export default Header;