import React from 'react';
import './Good.css'
import {imageEndpoint, isOrdered} from "../../services/GoodService";
import minusBtn from '../../assets/img/minus-svgrepo-com.svg'
import plusBtn from '../../assets/img/plus-circle-svgrepo-com.svg'
import GoodButton from "../Button/Button";
import onEventSound from '../../assets/audio/OnEvent.mp3'
import useSound from "use-sound";

const Good = ({good, addGood, removeGood, orderedGoods, showModal}) => {

    const [playOnEvent] = useSound(onEventSound)


    const onShowModal = () => {
        showModal(good)
    }

    const onAdd = () => {
        playOnEvent()
        addGood(good);

    }
    const onRemove = () => {
        playOnEvent()
        removeGood(good);

    }

    let {isOrderedGood, orderedGood} =  isOrdered(good.id, orderedGoods);

    return (
        <div className={"Good"}>

            <div>
                <img
                    src={imageEndpoint + good.imageId}
                    onClick={onShowModal} alt=""
                />
                <div className={"goodName"}>
                    <span>{good.name}</span>
                    <span style={{alignSelf:"center"}}>{good.price} грн.</span>
                </div>
            </div>
            <div>
                {!isOrderedGood
                    ?
                    <GoodButton onClick={onAdd} text={"Додати"}/>
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

        </div>
    );
};

export default Good;