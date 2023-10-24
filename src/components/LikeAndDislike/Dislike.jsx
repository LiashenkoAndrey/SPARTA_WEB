import React, {useState} from 'react';
import {DislikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'
import {Tooltip} from "antd";


const Dislike = ({dislikes, onDislike, isClientRegistered, good}) => {


    const onDislikeEvent = (e) => {
        if (good.isClicked === undefined) {
            onDislike()
            good.isClicked=true;
        }
    }

    return (
        <div className={"markBtnWrapper disLikeWrapper"}>

            {isClientRegistered
                ?
                <div onClick={onDislikeEvent}>
                    <Tooltip trigger={['click']} title={"👎👎👎"} placement="topLeft" overlayClassName="numeric-input">

                        <DislikeOutlined/>
                    </Tooltip>
                    {dislikes !== 0
                        ?
                        <span className={"likeOrDislikeAmount dislike"}>{dislikes}</span>
                        :
                        <div></div>
                    }
                </div>
                :
                <div>
                    <Tooltip trigger={['click']} title={"Можна голосувати після першого замовлення)"} placement="topLeft" overlayClassName="numeric-input">
                        <DislikeOutlined/>
                    </Tooltip>
                    {dislikes !== 0
                        ?
                        <span className={"likeOrDislikeAmount dislike"}>{dislikes}</span>
                        :
                        <div></div>
                    }
                </div>
            }
        </div>
    );
};

export default Dislike;