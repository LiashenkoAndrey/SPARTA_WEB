import React, {useContext, useEffect, useState} from 'react';
import Good from "../Good/Good";
import './GoodsList.css'
import {useTelegram} from "../../hooks/useTelegram";
import {
    getGoodsMarks,
    getTotalPrice,
    host, imageEndpoint,
    isOrdered,
    markGood
} from "../../services/GoodService";
import {OrderContext} from "../../context";
import {useNavigate} from "react-router-dom";
import {Empty, message, Modal} from "antd";
import axios from "axios";
import {TelegramContext} from "../../context2";
import GoodMarks from "../GoodMarks/GoodMarks";
import {DeleteOutlined, DeleteTwoTone} from "@ant-design/icons";
import {isAuth} from "../../services/ClientService";


const goodsList = await axios.get(host + `/good/all`)

const GoodsList = () => {

    const {client, setClient} = useContext(TelegramContext);
    const navigate = useNavigate();
    const {orderedGoods, setOrderedGoods} = useContext(OrderContext)
    const {mainBtn, tg} = useTelegram();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [good, setGood] = useState('')
    const [likes, setLikes] = useState(-1);
    const [dislikes, setDislikes] = useState(-1);
    const [goodsMarks, setGoodsMarks] = useState([])
    const [goods, setGoods] = useState(goodsList.data)
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchGoodsMarks()

    }, [client]);

     async function fetchGoodsMarks() {
         if (client.isRegistered) {
             const response = await getGoodsMarks(client.client.id)
             setGoodsMarks(response)
         }
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
        good.likes = newLikes
        setGood(good)
        setLikes(newLikes)
        markGood(client.client.id, good.id, true)
    }

    const onDislike = () => {
        let newDislikes = good.dislikes + 1;
        good.dislikes = newDislikes
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

    async function onDeleteGood () {
        let deleteGoodId = good.id
        await axios.delete(host + `/good/${deleteGoodId}/delete`).then(() => {
            console.log(goods)
            let res = goods.filter((e) => {
                return  e.id !== deleteGoodId
            })
            setGoods(res)
            handleCancel()

            messageApi.open({
                type: 'success',
                content: 'Видалено успішно!',
            });
        }, (error) => {
            messageApi.open({
                type: 'error',
                content: "Помилка :(",
            });
        })
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
            {contextHolder}

            {goods.length !== 0
                ?
                <div>
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
                        <img className={"modalImage"} src={imageEndpoint + good.imageId} alt="Фото товару"/>

                        <GoodMarks
                            goodsMarks={goodsMarks}
                            good={good}
                            likes={likes}
                            dislikes={dislikes}
                            client={client}
                            onLike={onLike}
                            onDislike={onDislike}
                        />

                        {isAuth()
                            ?
                            <div className={"deleteGoodBtn"} onClick={onDeleteGood}>
                                <DeleteTwoTone style={{fontSize: "40px"}}  twoToneColor="red" />
                            </div>
                            :
                            <div></div>
                        }
                    </Modal>
                </div>
                :
                <Empty style={{marginTop: 40}} description={<span style={{color: "var(--tg-theme-text-color)"}}>Поки немає товарів</span>}/>
            }

        </div>
    );
};

export default GoodsList;