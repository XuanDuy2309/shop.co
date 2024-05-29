import React from 'react';
import './style.css'
import images from "../../assets/images";
import {Rating} from "react-simple-star-rating";

function CommentCard({
    rate,
                     }) {
    return (
        <div className="cmt-card">
            <div className="user-rate">
                <Rating
                    readonly={true}
                    initialValue={rate}
                    allowFraction={true}
                    size={24}
                />
            </div>
            <div className="username">
                <span>Sarah M.</span>
                <img src={images.tickGreen} alt=""/>
            </div>
            <div className="cmt-content">
                <span>"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.”</span>
            </div>
        </div>
    );
}

export default CommentCard;