import React from 'react';
import {DislikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'


const DisabledDislike = ({dislikes}) => {
    return (
        <div className={"markBtnWrapper markedDislikeWrapper"}>
            <DislikeOutlined />
            <span className={"likeOrDislikeAmount dislike"}>{dislikes}</span>
        </div>
    );
};

export default DisabledDislike;