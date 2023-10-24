import React, {useState} from 'react';
import Order from "../Order/Order";
import './OrderList.css'
import {Collapse} from "antd";
import axios from "axios";
import {host} from "../../services/GoodService";

const { Panel } = Collapse;

const ordersList = await axios.get(host + "/order/all");
const OrderList = () => {

    const [orders, setOrders] = useState(ordersList.data);

    function toPrettyDate(date) {
        let month = date.getMonth();
        let prettyMonth = (month.toString().length == 1 ? "0" + month.toString()  : month)
        return `час - ${date.toTimeString().substring(0,5)} |   дата - ${date.getDate()}/${prettyMonth}`
    }

    console.log(orders)
    return (
        <div className={"ordersListWrapper"}>
            <Collapse >
                {orders.map(item => (
                    <Panel key={item.id + 'panel'}
                           header={toPrettyDate(new Date(item.createdOn)) + "   |    id - " + item.id}
                    >
                        <Order
                            key={item.id}
                            client={item.client}
                            goodsWithAmount={item.goodsWithAmount}
                            message={item.message}
                            methodOfDelivery={item.methodOfDelivery}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default OrderList;