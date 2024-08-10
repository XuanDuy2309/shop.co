import React, {useState} from 'react';
import './style.css';
import images from "../../assets/images";
import { useNavigate } from 'react-router-dom';

function CartItem({
    onChangeQuantity,
    onDelete,
    item,

                  }) {
    const [quantityItem, setQuantityItem] = useState(item.quantity);

    const navi = useNavigate();

    const handleMinusProduct=()=>{
        if (quantityItem>1){
            setQuantityItem((prevQuantity)=>prevQuantity-1);
            onChangeQuantity(-item.price);
        }
    }

    const handleAddProduct=()=>{
        setQuantityItem((prevQuantity)=>prevQuantity+1);
        onChangeQuantity(item.price);
    }


    return (
        <div className="cart-item">
            <div className="item-img">
                <img src={item.image} alt=""/>
            </div>
            <div className="item-about">
                <div className="item-name">
                    <span onClick={()=>navi(`/product/${item.id}`)}>{item.title}</span>
                    <img
                        src={images.icTrash}
                        alt=""
                        onClick={()=>{onDelete(item.id)}}
                    />
                </div>

                <div className="item-social">
                    <span>Size: Large</span>
                    <span>Color: White</span>
                </div>

                <div className="item-price">
                    <span>${item.price}</span>
                    <div className="item-quantity">
                        <img src={images.icMinus} alt=""
                             onClick={handleMinusProduct}
                        />
                        <span>{quantityItem}</span>
                        <img src={images.icAdd} alt=""
                             onClick={handleAddProduct}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;