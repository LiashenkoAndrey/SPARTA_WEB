import React from 'react';
import Client from "../Client/Client";
import './Order.css'

const Order = ({client, goodsWithAmount, message}) => {
    console.log(client)
    console.log(goodsWithAmount)
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
                        <span>Ціна: 200 грн.</span>
                    </div>
                </div>
            ))}

            <div>
                <Client client={client} />
                {message
                    ?
                    <div>
                        <h4>Коментар:</h4>
                        <p>{message}</p>
                    </div>
                    :
                    <div></div>
                }
            </div>
            <div>
                <h4 style={{textAlign:"end"}}>Загальна сума: 2300 грн.</h4>
            </div>
        </div>
    );
};

export default Order;