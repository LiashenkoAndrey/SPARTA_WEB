import React from 'react';
import {LikeOutlined} from "@ant-design/icons";
import './LikeAndDislike.css'
import {Tooltip} from "antd";

const Like = ({likes, onLike, isClientRegistered, good}) => {

    const onLikeEvent = () => {
        if (good.isClicked === undefined) {
            onLike()
            good.isClicked=true;
        }
    }



    return (
        <div className={"likeWrapper markBtnWrapper"}>

            {isClientRegistered
                ?
                <div>
                    <Tooltip onClick={onLikeEvent}  trigger={['click']} title={"👍👍👍"} placement="topLeft" overlayClassName="numeric-input">
                        <LikeOutlined />
                    </Tooltip>
                    {likes !== 0
                        ?
                        <span className={"likeOrDislikeAmount like"}>{likes}</span>

                        :
                        <div></div>
                    }
                </div>
                :
                <div>
                    <Tooltip trigger={['click']} title={"Можна голосувати після першого замовлення)"} placement="topLeft" overlayClassName="numeric-input">
                        <LikeOutlined />
                    </Tooltip>
                    {likes !== 0
                        ?
                        <span className={"likeOrDislikeAmount like"}>{likes}</span>

                        :
                        <div></div>
                    }
                </div>
            }

        </div>
    );
};

export default Like;