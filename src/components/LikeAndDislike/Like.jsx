import React from 'react';
import {LikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'
import {Tooltip} from "antd";

const Like = ({likes, onLike}) => {
    return (
        <div onClick={onLike} className={"likeWrapper markBtnWrapper"}>

            <Tooltip trigger={['click']} title={"👍👍👍"} placement="topLeft" overlayClassName="numeric-input">
                <LikeOutlined />
            </Tooltip>
            {likes !== 0
                ?
                <span className={"likeOrDislikeAmount like"}>{likes}</span>

                :
                <div></div>
            }
        </div>
    );
};

export default Like;