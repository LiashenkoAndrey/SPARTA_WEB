import React, {useContext, useEffect, useState} from 'react';
import Good from "../Good/Good";
import './GoodsList.css'
import {useTelegram} from "../../hooks/useTelegram";
import {getTotalPrice, host, isOrdered, markGood} from "../../services/GoodService";
import {OrderContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";
import {Modal} from "antd";
import Dislike from "../LikeAndDislike/Dislike";
import Like from "../LikeAndDislike/Like";
import axios from "axios";
import {HeartTwoTone} from "@ant-design/icons";
import {TelegramContext} from "../../context2";


const GoodsList = ({goods}) => {
    const {client, setClient} = useContext(TelegramContext);
    const navigate = useNavigate();
    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {mainBtn} = useTelegram();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [good, setGood] = useState('')
    const [likes, setLikes] = useState(-1);
    const [dislikes, setDislikes] = useState(-1);

    const showModal = (selectedGood) => {
        setGood(selectedGood)
        setLikes(selectedGood.likes)
        setDislikes(selectedGood.dislikes)
        setIsModalOpen(true);

        mainBtn.hide()
    };



    function checkMainButton() {
        if (orderedGoods.length > 0) {
            if (orderedGoods[0] !== undefined) {
                enableConfirmButton()

            } else {
                console.log(orderedGoods[0])
                console.log(orderedGoods[0] === undefined)
                if (orderedGoods[0] === undefined) {
                    mainBtn.hide()
                }
            }
        }
    }

    const addGood = (good) => {
        let {isOrderedGood, orderedGood} = isOrdered(good.id, orderedGoods);

        if (!isOrderedGood) {
            orderedGoods.push({good: good, amount: 1})
            setOrderedGoods([...orderedGoods])
        } else {
            let foundGood = orderedGoods.find((elem) => elem.good.id === good.id)
            let elemId = orderedGoods.indexOf(foundGood);
            orderedGoods[elemId].amount = orderedGood.amount +1;
            setOrderedGoods([...orderedGoods])
            console.log("ordered good: " + good)
        }

        checkMainButton()
    }

    const handleOk = () => {
        addGood(good)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        if (mainBtn.isVisible) {
            mainBtn.show()
        }
        setIsModalOpen(false);
        checkMainButton()
    };

    const onLike = () => {
        let newLikes = good.likes + 1;
        good.likes = newLikes
        setGood(good)
        setLikes(newLikes)
        markGood(client.id, good.id, true)
    }

    const onDislike = () => {
        let newDislikes = good.dislikes + 1;
        good.dislikes = newDislikes
        setGood(good)
        setDislikes(newDislikes)
        markGood(34, 1, false)
    }

    function enableConfirmButton() {
        mainBtn.setParams({
            text: getTotalPrice(orderedGoods) + " грн. Продовжити"
        })

        mainBtn.show();
    }

    useEffect(() => {
        mainBtn.onClick(() => navigate("/confirm"))
        mainBtn.isActive = true;
    }, [mainBtn]);

    const removeGood = (good) => {
        let {orderedGood} = isOrdered(good.id, orderedGoods);
        if (orderedGood.amount === 1) {
            delete orderedGoods[orderedGoods.indexOf(orderedGood)]
        } else {
            orderedGood.amount = orderedGood.amount - 1;
        }
        setOrderedGoods(orderedGoods.filter((elem) => elem !== undefined))
        checkMainButton()
    }


    return (
        <div className={"GoodsListWrapper"}>
            <Link to={"/confirm"}>Confirm</Link>
            {client.id}
            {client.toString()}
            {client.chatId}
            <div className={"GoodsList"}>
                {goods.map(item => (
                    <Good
                        showModal={showModal}
                        good={item}
                        key={item.id}
                        goods={goods}
                        addGood={addGood}
                        removeGood={removeGood}
                        orderedGoods={orderedGoods}
                    />
                ))}
            </div>

            <Modal
                title={good.name}
                open={isModalOpen}
                okText={`Додати ${good.name}`}
                cancelText={"Закрити"}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <img className={"modalImage"} src={good.image_url} alt="Фото товару"/>

                <div className={"likes"}>
                    <Dislike onDislike={onDislike} dislikes={dislikes}/>
                    <Like onLike={onLike} likes={likes}/>
                </div>
            </Modal>
        </div>
    );
};

export default GoodsList;