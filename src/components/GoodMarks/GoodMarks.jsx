import React from 'react';
import {isMarked} from "../../services/GoodService";
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";
import Dislike from "../LikeAndDislike/Dislike";
import Like from "../LikeAndDislike/Like";
import './GoodMarks.css'
import '../LikeAndDislike/LikeAndDislike.css'
import DisabledDislike from "../LikeAndDislike/DisabledDislike";
import DisabledLike from "../LikeAndDislike/DisabledLike";
import {Tooltip} from "antd";


const GoodMarks = ({goodsMarks, good, likes, dislikes, client, onLike, onDislike}) => {

    return (
        <div>

            {client.isRegistered

                ?

                <div className={"likes"}>
                    {isMarked(goodsMarks, good.id, false)
                        ?
                        <DisabledDislike dislikes={dislikes}/>
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
                        <DisabledLike likes={likes}/>
                        :
                        <Like
                            good={good}
                            onLike={onLike}
                            likes={likes}
                            isClientRegistered={client.isRegistered}
                        />
                    }
                </div>

                :

                <div className={"likes"}>
                    <div style={{position: "relative"}}>
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

                    <div style={{position: "relative"}}>
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
                </div>
            }
        </div>


    );
};

export default GoodMarks;