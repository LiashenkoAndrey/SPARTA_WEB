import React, {useCallback, useContext, useEffect, useState} from 'react';
import {OrderContext} from "../../context";
import './Confirm.css';
import {Link} from "react-router-dom";
import {getTotalPrice, saveOrder} from "../../services/GoodService";
import {useTelegram} from "../../hooks/useTelegram";
import {Order} from '../../domain/Order';
import {Client} from '../../domain/Client';
import {TelegramContext} from "../../context2";


const Confirm = () => {

    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {client, setClient} = useContext(TelegramContext);
    const {mainBtn, tg} = useTelegram();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [clientName, setClientName] = useState('')
    const [methodOfDelivery, setMethodOfDelivery] = useState('Самовивіз')
    const [message, setMessage] = useState('')
    const [addressInputDisplay, setAddressInputDisplay] = useState('none')
    const [addressInput, setAddressInput] = useState('')

    const sendData = useCallback(() => {
        const order = new Order(
            new Client(tg.initDataUnsafe.user.id, client.chatId, clientName, phoneNumber),
            orderedGoods,
            message,
            methodOfDelivery
        )

        if (!client.chatId) {
            throw new Error("chat id is: " + client.chatId)
        }

        saveOrder(order);
        tg.close();
    },[chatId, clientName, phoneNumber, orderedGoods, message, methodOfDelivery])

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
        if (!phoneNumber || !clientName || (addressInputDisplay === 'block' && !addressInput)) {
            mainBtn.hide();
        } else {
            mainBtn.show();
        }
    }, [phoneNumber, clientName, addressInputDisplay, addressInput]);

    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const onChangeAddressInput = (e) => {
        setAddressInput(e.target.value)
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const onChangeClientName = (e) => {
        setClientName(e.target.value)
    }

    const onChangeDeliveryMethod = (e) => {
        setMethodOfDelivery(e.target.value)
        if (e.target.value === "Кур'єр") {
            setAddressInputDisplay('block')
        } else {
            setAddressInputDisplay('none')
        }
        encodeURIComponent()
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
                            <h4>{item.good.name}</h4>
                            <p>
                                <span style={{color: '#ecbd03'}}>
                                    <span style={{textTransform: "uppercase", fontSize: 23}}>{item.amount}</span>
                                    x
                                </span>
                            </p>
                        </div>
                        <div>
                            {item.good.price + " грн"}
                        </div>
                    </div>
                ))}
                <h4 className={"totalPrice"}>Загальна сума: {getTotalPrice(orderedGoods)}</h4>
            </div>

            <div className={"userInputWrapper"}>
                <div>
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

                <div>
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
                
                <div>
                    <label htmlFor="deliverySelect">Метод доставки</label>
                    <select id={"deliverySelect"} className={"deliverySelect"} onChange={onChangeDeliveryMethod}>
                        <option value="Самовивіз">Самовивіз</option>
                        <option value="Кур'єр">Доставка кур'єром (безкоштовно)</option>
                    </select>

                    <div style={{display: addressInputDisplay}}>
                        <label htmlFor="addressInput">Адреса</label>
                        <input
                            id={"addressInput"}
                            type="text"
                            className={"input"}
                            onChange={onChangeAddressInput}
                            max={255}
                        />
                    </div>
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