import React from 'react';
import Card from "../../components/card";
import Button from "../../components/button";
import './style.css'

function ListProducts({
    listProducts,
    title,
    }) {


    return (
        <div className="list-products">
            <div className="list-title" hidden={!title?true:false}>
                <span>{title}</span>
            </div>

            <div className="products">
                {
                    listProducts.map((item,index)=>{
                        return(
                            <Card
                                key={index}
                                product={item}
                            />
                        );
                    })
                }
            </div>

            <div className="list-btn">
                <Button />

            </div>

        </div>

    );
}

export default ListProducts;