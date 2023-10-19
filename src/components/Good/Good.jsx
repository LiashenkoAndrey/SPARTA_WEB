import React from 'react';
import './Good.css'
import Button from "../Button/Button";
import {isOrdered} from "../../services/GoodService";
import minusBtn from '../../assets/img/minus-svgrepo-com.svg'
import plusBtn from '../../assets/img/plus-circle-svgrepo-com.svg'
const Good = ({good, addGood, removeGood, goods, orderedGoods}) => {

    const onAdd = () => {
        addGood(good);
    }

    const onRemove = () => {
        removeGood(good);
    }

    let {isOrderedGood, orderedGood} =  isOrdered(good.id, orderedGoods);

    return (
        <div className={"Good"}>
            <img src={good.image_url} alt=""/>
            <div>
                <span className={"goodName"}>{`Name: ${good.price}`}</span>
            </div>
            {!isOrderedGood
                ?
                <Button onClick={onAdd} text={"Додати"}/>
                :
                <div className={"goodButtonsWrapper"} style={{display: "flex", gap: 15, fontSize: 20}}>
                    <img onClick={onAdd} src={plusBtn} alt={"Додати"} />
                    <img onClick={onRemove} src={minusBtn} alt={"Відняти"} />
                    <div className={"goodsAmount"}>
                        <span>{orderedGood.amount}</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default Good;