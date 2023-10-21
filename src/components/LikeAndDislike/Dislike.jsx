import React from 'react';
import {DislikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'
import {Tooltip} from "antd";

const Dislike = ({dislikes, onDislike}) => {
    return (
        <div onClick={onDislike} className={"markBtnWrapper disLikeWrapper"}>

            <Tooltip trigger={['click']} title={"👎👎👎"} placement="topLeft" overlayClassName="numeric-input">

                <DislikeOutlined twoToneColor="#eb2f96" />
            </Tooltip>
            {dislikes !== 0
                ?
                <span className={"likeOrDislikeAmount dislike"}>{dislikes}</span>
                :
                <div></div>
            }

        </div>
    );
};

export default Dislike;