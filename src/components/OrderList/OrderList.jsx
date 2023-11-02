import React, {useState} from 'react';
import Order from "../Order/Order";
import './OrderList.css'
import {Collapse, Select} from "antd";
import axios from "axios";
import {host} from "../../services/GoodService";

const { Panel } = Collapse;

const ordersList = await axios.get(host + "/order/all");
const OrderList = () => {

    const [orders, setOrders] = useState(ordersList.data);

    function toPrettyDate(date, id) {
        let month = date.getMonth();
        let prettyMonth = (month.toString().length == 1 ? "0" + month.toString()  : month)
        return <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{date.toTimeString().substring(0,5)}</span>
                    <span>{date.getDate() + "/" + prettyMonth}</span>
                    <span>ID {id}</span>
                </div>
    }

    console.log(orders)
    return (
        <div className={"ordersListWrapper"}>
            <div className={"orderFilterSelect"}>
                <Select
                    defaultValue="За тиждень"
                    style={{ width: 120 }}
                    options={[
                        { value: 'За тиждень', label: 'За тиждень' },
                        { value: 'За місяць', label: 'За місяць' },
                        { value: 'Всі', label: 'Всі' },
                    ]}
                />
            </div>
            <Collapse>
                {orders.map(item => (
                    <Panel key={item.id + 'panel'}
                           header={toPrettyDate(new Date(item.createdOn), item.id)}
                    >
                        <Order
                            key={item.id}
                            client={item.client}
                            goodsWithAmount={item.goodsWithAmount}
                            message={item.message}
                            address={item.address}
                            methodOfDelivery={item.methodOfDelivery}
                        />
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default OrderList;