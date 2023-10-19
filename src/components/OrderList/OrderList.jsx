import React from 'react';
import Order from "../Order/Order";
import './OrderList.css'


const OrderList = ({orders}) => {

    console.log(orders)
    return (
        <div>
            <div className={"ordersList"}>
                {orders.map(item => (
                    <Order
                        key={item.id}
                        client={item.client}
                        goodsWithAmount={item.goodsWithAmount}
                        message={item.message}
                    />
                ))}
            </div>
        </div>
    );
};

export default OrderList;