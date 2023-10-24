import React, {useContext, useEffect, useState} from 'react';
import Good from "../Good/Good";
import './GoodsList.css'
import {useTelegram} from "../../hooks/useTelegram";
import {getTotalPrice, host, isMarked, isOrdered, markGood} from "../../services/GoodService";
import {OrderContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";
import {Modal} from "antd";
import Dislike from "../LikeAndDislike/Dislike";
import Like from "../LikeAndDislike/Like";
import axios from "axios";
import {TelegramContext} from "../../context2";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";


async function getGoodsMarks(clientId) {
    try {
        if (clientId) {
            const response = await axios.get("http://localhost:8080/api/good/getMarks?clientId=" + clientId);
            return response.data;
        }
        return [];
    } catch (e) {
        console.log(e)
    }
}



const goodsList = await axios.get(host + `/good/all`)

const GoodsList = () => {

    const {client, setClient} = useContext(TelegramContext);
    const navigate = useNavigate();
    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {mainBtn} = useTelegram();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [good, setGood] = useState('')
    const [likes, setLikes] = useState(-1);
    const [dislikes, setDislikes] = useState(-1);
    const [goodsMarks, setGoodsMarks] = useState([])


    const [goods, setGoods] = useState(goodsList.data)

    useEffect(() => {
        fetchGoodsMarks()
    }, []);

    async function fetchGoodsMarks() {
        const response = await getGoodsMarks(33)
        console.log(response)
        setGoodsMarks(response)
    }

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
        console.log(client)
        good.likes = newLikes
        setGood(good)
        setLikes(newLikes)
        markGood(client.client.id, good.id, true)
    }

    const onDislike = () => {
        let newDislikes = good.dislikes + 1;
        good.dislikes = newDislikes
        console.log(client)
        setGood(good)
        setDislikes(newDislikes)
        markGood(client.client.id, good.id, false)
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

                    {isMarked(goodsMarks, good.id, false)
                        ?
                        <div className={"markBtnWrapper markedDislikeWrapper"}>
                            <DislikeOutlined />
                            <span className={"likeOrDislikeAmount dislike"}>{dislikes}</span>
                        </div>
                        :
                        <Dislike
                            good={good}
                            onDislike={onDislike}
                            dislikes={dislikes}
                            isClientRegistered={client.isRegistered}
                        />
                    }

                    {isMarked(goodsMarks, good.id, true)
                        ?
                        <div className={"markBtnWrapper markedLikeWrapper"}>
                            <LikeOutlined />
                            <span className={"likeOrDislikeAmount like"}>{likes}</span>
                        </div>
                        :
                        <Like
                            good={good}
                            onLike={onLike}
                            likes={likes}
                            isClientRegistered={client.isRegistered}
                        />
                    }
                </div>
            </Modal>
        </div>
    );
};

export default GoodsList;