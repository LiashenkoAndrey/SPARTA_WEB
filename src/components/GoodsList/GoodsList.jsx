import React, {useContext, useEffect, useState} from 'react';
import Good from "../Good/Good";
import './GoodsList.css'
import {useTelegram} from "../../hooks/useTelegram";
import {getTotalPrice, isOrdered} from "../../services/GoodService";
import {OrderContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";


const GoodsList = ({goods}) => {

    const navigate = useNavigate();
    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {mainBtn} = useTelegram();

    useEffect(() => {
        console.log(orderedGoods.length)
        if (orderedGoods.length > 0) {
           enableConfirmButton()
        }
    }, []);

    const addGood = (good) => {
        let {isOrderedGood, orderedGood} = isOrdered(good.id, orderedGoods);

        if (!isOrderedGood) {
            console.log("add good: " + good)
            orderedGoods.push({good: good, amount: 1})
            setOrderedGoods([...orderedGoods])
        } else {
            let foundGood = orderedGoods.find((elem) => elem.good.id === good.id)
            let elemId = orderedGoods.indexOf(foundGood);
            orderedGoods[elemId].amount = orderedGood.amount +1;
            setOrderedGoods([...orderedGoods])
            console.log("ordered good: " + good)
        }

        enableConfirmButton();

    }

    function enableConfirmButton() {
        mainBtn.show();
        mainBtn.onClick(() => navigate("/confirm"))
        mainBtn.setParams({
            text: getTotalPrice(orderedGoods) + " грн. Продовжити"
        })
        mainBtn.isActive = true;
    }

    const removeGood = (good) => {
        let {orderedGood} = isOrdered(good.id, orderedGoods);
        console.log(orderedGoods)
        if (orderedGood.amount === 1) {
            delete orderedGoods[orderedGoods.indexOf(orderedGood)]
        } else {
            orderedGood.amount = orderedGood.amount - 1;
        }
        setOrderedGoods(orderedGoods.filter((elem) => elem !== undefined))
    }

    return (
        <div className={"GoodsListWrapper"}>
            <div className={"GoodsList"}>
                {goods.map(item => (
                    <Good
                        good={item}
                        key={item.id}
                        price={200}
                        goods={goods}
                        addGood={addGood}
                        removeGood={removeGood}
                        orderedGoods={orderedGoods}
                    />
                ))}
            </div>
        </div>
    );
};

export default GoodsList;