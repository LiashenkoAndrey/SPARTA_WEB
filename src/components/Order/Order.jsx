import React from 'react';
import './Order.css'
import {Descriptions} from "antd";
import {getTotalPrice} from "../../services/GoodService";

const Order = ({client, goodsWithAmount, message, methodOfDelivery, createdOn}) => {
    console.log(client)

    return (
        <div className={"order"}>
            {goodsWithAmount.map(goodWithAmount => (
                <div className={"goodWithAmount"} key={goodWithAmount.good.id}>
                    <div>
                        <img src={goodWithAmount.good.image_url} alt=""/>
                        <span>{goodWithAmount.good.name}</span>
                    </div>
                    <div>
                        <span>{goodWithAmount.amount} од.</span>
                        <span>Ціна: {goodWithAmount.good.price} грн.</span>
                    </div>
                    <hr/>
                </div>
            ))}

            <Descriptions title="Деталі запису">
                <Descriptions.Item label="Ім'я">{client.name}</Descriptions.Item>
                <Descriptions.Item label="Телефон">{client.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Метод доставки">{methodOfDelivery}</Descriptions.Item>
                <Descriptions.Item label="Загальна сума">{getTotalPrice(goodsWithAmount)}</Descriptions.Item>

                {message
                ?
                    <Descriptions.Item label="Коментар">{message}</Descriptions.Item>

                :
                    <div></div>
                }
            </Descriptions>
        </div>
    );
};

export default Order;