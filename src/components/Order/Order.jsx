import React from 'react';
import './Order.css'
import {Descriptions} from "antd";
import {getTotalPrice, imageEndpoint} from "../../services/GoodService";
import Paragraph from "antd/es/typography/Paragraph";
import { Space, Typography } from 'antd';
const { Text, Link } = Typography;

const Order = ({client, goodsWithAmount, message, methodOfDelivery, address, goodId}) => {

    return (
        <div className={"order"}>
            {goodsWithAmount.map(goodWithAmount => (
                <div className={"goodWithAmount"} key={goodWithAmount.good.id}>
                    <div>
                        <img src={imageEndpoint + goodWithAmount.good.imageId} alt=""/>
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
                <Descriptions.Item label="Телефон">
                    <Text style={{color: "var(--tg-theme-text-color)"}} copyable={{
                        tooltips: ['Копіювати номер', 'Скопійовано!']
                    }}>{client.phoneNumber}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Метод доставки">{methodOfDelivery}</Descriptions.Item>
                {methodOfDelivery === "Кур'єр"
                    ?
                    <Descriptions.Item label="Адреса">{address}</Descriptions.Item>
                    :
                    <div></div>
                }
                <Descriptions.Item label="Загальна сума">{getTotalPrice(goodsWithAmount)}</Descriptions.Item>

                {message
                ?
                    <Descriptions.Item label="Коментар">{message}</Descriptions.Item>
                :
                    <div></div>
                }
                <Descriptions.Item label="ID">{goodId}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default Order;