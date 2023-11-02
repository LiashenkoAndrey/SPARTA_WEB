import React from 'react';
import logo from '../../assets/img/logo.png'
import './Header.css'
import {useTelegram} from "../../hooks/useTelegram";
import close from '../../assets/img/removeBtn.svg'
import {isAuth} from "../../services/ClientService";

const Header = () => {
    const {onClose} = useTelegram();
    const {tg} = useTelegram();

    return (
        <div className={"Header"}>
            <div className={"logoWrapper"}>
                <img src={logo} width={120} alt=""/>
            </div>
            {isAuth()
                ?
                <div>
                    <a href="/orders">/orders</a>
                    <a href="/newGood">/newGood</a>
                </div>
                :
                <div></div>
            }

            <img src={close} style={{width: 50, padding: 13}} onClick={onClose} alt=""/>
        </div>
    );
};

export default Header;