import React from 'react';
import './style.css';

import {useNavigate} from "react-router-dom";
import {Rating} from "react-simple-star-rating";


function Card({
    product
              }){
    const navigate = useNavigate()

    const getRate = (product) => {
        return product.rating['rate'];
    }

    return (
        <div className="card" onClick={()=>{navigate('/product/'+product.id)}}>
            <div className="img-product">
                <img src={product.image} alt=""/>
            </div>
            <span className="card-title">{product.title}</span>

            <div className="card-content">
                <div className="rate">
                    <Rating
                        readonly={true}
                        initialValue={getRate(product)}
                        allowFraction={true}
                        size={24}
                    />
                    <span>{getRate(product)}/5</span>
                </div>
                <div className="price-line">
                    <span className="price-current">${product.price}</span>
                </div>
            </div>

        </div>
    );
}

export default Card;