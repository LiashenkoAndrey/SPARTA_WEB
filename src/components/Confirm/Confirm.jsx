import React, {useCallback, useContext, useEffect, useState} from 'react';
import {OrderContext} from "../../context";
import './Confirm.css';
import {Link} from "react-router-dom";
import {getTotalPrice, saveOrder} from "../../services/GoodService";
import {useTelegram} from "../../hooks/useTelegram";
import {Order} from '../../domain/Order';
import {Client} from '../../domain/Client';


const Confirm = () => {

    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {mainBtn, tg} = useTelegram();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [clientName, setClientName] = useState('')
    const [message, setMessage] = useState('')

    const sendData = useCallback(() => {

        const order = new Order(
            new Client(tg.initDataUnsafe.user.id, clientName, phoneNumber),
            orderedGoods,
            message
        )

        saveOrder(order);
        // tg.close();
    },[message])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", sendData)
        return () => {
            tg.offEvent("mainButtonClicked", sendData)
        }
    }, [sendData]);

    useEffect(() => {
        mainBtn.setParams({
            text: getTotalPrice(orderedGoods) + " грн. Замовити"
        })
    }, []);

    useEffect(() => {
        if (!phoneNumber || !clientName) {
            mainBtn.hide();
        } else {
            mainBtn.show();
        }
    }, [phoneNumber, clientName]);

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const onChangeClientName = (e) => {
        setClientName(e.target.value)
    }


    return (
        <div>
            <div className={"orderHeader"}>
                <h2>Ваше замовлення</h2>
                <button onClick={sendData}>Send data</button>
                <Link style={{color: "green"}} to={"/"}>Змінити</Link>
            </div>

            <div className={"orderedItems"}>
                {orderedGoods.map(item => (
                    <div className={"orderedItem"}>
                        <div className={"titleWrapper"} >
                            <img style={{height: 80}} src={item.good.image_url} alt=""/>
                            <p>
                                <span style={{color: '#ecbd03'}}>
                                    <span style={{textTransform: "uppercase", fontSize: 23}}>{item.amount}</span>
                                    x
                                </span>
                            </p>
                        </div>
                        <div>
                            {item.amount + " грн"}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{margin: 20}}>
                <div style={{paddingTop: 20}}>
                    <label htmlFor="phoneNumber">
                        <span className={"requiredLabel"}>Ваш номер телефону</span>
                    </label>
                    <input
                        value={phoneNumber}
                        id={"phoneNumber"}
                        type={"text"}
                        onChange={onChangePhoneNumber}
                        className={"input"}
                        maxLength={13} max={13}
                    />
                </div>

                <div style={{paddingTop: 20}}>
                    <label htmlFor="clientName">
                        <span className={"requiredLabel"} >Ім'я</span>
                    </label>
                    <input
                        value={clientName}
                        type={"text"}
                        id={"clientName"}
                        onChange={onChangeClientName}
                        className={"input"}
                        maxLength={50}
                    />
                </div>
            </div>

            <div className={"commentWrapper"}>
                <textarea
                    value={message}
                    rows="7"
                    placeholder={"Додати коментар..."}
                    onChange={onChangeMessage}
                />
                <p className={"messageHint"} >Будь-яке додаткове побажання, уточнення</p>
            </div>

        </div>
    );
};

export default Confirm;