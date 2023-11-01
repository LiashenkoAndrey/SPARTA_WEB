import React from 'react';
import {LikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'

const DisabledLike = ({likes}) => {
    return (
        <div className={"markBtnWrapper markedLikeWrapper"}>
            <LikeOutlined />
            <span className={"likeOrDislikeAmount like"}>{likes}</span>
        </div>
    );
};

export default DisabledLike;