import React, {useEffect, useState} from 'react';
import Order from "../Order/Order";
import './OrderList.css'
import {Collapse, Empty, message, Select} from "antd";
import axios from "axios";
import {host} from "../../services/GoodService";
import deleteImg from '../../assets/img/delete.png'
import {getAll, getForToday} from "../../services/OrderService";

const { Panel } = Collapse;

const ordersList = await axios.get(host + "/order/all?forToday=true");
const OrderList = () => {

    const [orders, setOrders] = useState(ordersList.data);

    useEffect(() => {
        getForToday().then((res) => {
            setOrders(res.data)
        })
    }, []);

    const [messageApi, contextHolder] = message.useMessage();

    const onFilter = (val) => {
        if (val === "Всі") {
            getAll().then((res) => {
                setOrders(res.data)
            })
        } else {
            getForToday().then((res) => {
                setOrders(res.data)
            })
        }
    }



    const onDeleteOrder = (e) => {
        let id = e.target.getAttribute("data-good_id")
        axios.delete(host + `/order/${id}/delete`).then(() => {
            let filtered = orders.filter((e) => e.id != id);
            console.log(filtered)

            setOrders(filtered)

        }, (error) => {

            console.error(error)
            messageApi.open({
                type: 'error',
                content: "Помилка :(",
            });
        })
    }

    function toPrettyDate(date, id, methodOfDelivery) {
        let month = date.getMonth();
        let prettyMonth = (month.toString().length == 1 ? "0" + month.toString()  : month)
        return <div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>{date.toTimeString().substring(0,5)}</span>
                    <span>{date.getDate() + "/" + prettyMonth}</span>
                    {methodOfDelivery === "Кур'єр"
                        ?
                        <span className={"methodOfDelivery"} style={{color: "green"}} >{methodOfDelivery}</span>
                        :
                        <span className={"methodOfDelivery"} style={{color: "yellow"}} >{methodOfDelivery}</span>
                    }
                    <div className={"deleteOrderBtn"} onClick={onDeleteOrder}>
                        <img data-good_id={id} src={deleteImg} width={25} height={25} alt=""/>
                    </div>
                </div>
    }

    return (
        <div className={"ordersListWrapper"}>
            {contextHolder}
            <div className={"orderFilterSelect"}>
                <Select
                    onSelect={onFilter}
                    defaultValue="На сьогодні"
                    style={{ width: 120 }}
                    options={[
                        { value: 'На сьогодні', label: 'На сьогодні' },
                        { value: 'Всі', label: 'Всі' },
                    ]}
                />
            </div>

            {orders.length > 0
                ?
                <Collapse>
                    {orders.map(item => (
                        <Panel key={item.id + 'panel'}
                               header={toPrettyDate(new Date(item.createdOn), item.id, item.methodOfDelivery)}
                        >
                            <Order
                                key={item.id}
                                goodId={item.id}
                                client={item.client}
                                goodsWithAmount={item.goodsWithAmount}
                                message={item.message}
                                address={item.address}
                                methodOfDelivery={item.methodOfDelivery}
                            />
                        </Panel>
                    ))}
                </Collapse>
                :
                <Empty description={<span style={{color: "var(--tg-theme-text-color)"}}>Поки немає замовлень</span>}/>
            }
        </div>
    );
};

export default OrderList;