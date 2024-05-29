import React, {useEffect, useState} from 'react';
import './style.css';
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import CartItem from "../../components/cartItem";
import images from "../../assets/images";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";

function Cart(props) {
    // const listItemsDefault= [
    //     {
    //         image: images.arrival1,
    //         title: "T-SHIRT WITH TAPE DETAILS",
    //         price: 120,
    //         quantity: 1,
    //     },
    //     {
    //         image: images.arrival2,
    //         title: "SKINNY FIT JEANS",
    //         price: 240,
    //         quantity: 1,
    //
    //     },
    //     {
    //         image: images.arrival3,
    //         title: "CHECKERED SHIRT",
    //         price: 180,
    //         quantity: 1,
    //
    //     },
    //     {
    //         image: images.arrival4,
    //         title: "SLEEVE STRIPED T-SHIRT",
    //         price: 130,
    //         quantity: 1,
    //
    //     },
    //
    // ];


    const [listItems, setListItems] = useState([]);

    const [subTotal, setSubTotal] = useState(0);
    const [fee, setFee] = useState(15);

    const getUserId = () => {
        const parts = localStorage.getItem('token')?.split('.');
        return parts ? JSON.parse(atob(parts[1])).sub : null;
    };

    const getData = () => {
        try {
            const userId = getUserId();
            if (userId) {
                axios.get('https://fakestoreapi.com/carts/'+userId)
                    .then(res=>{
                        if (res.data && res.data.products)
                            getAllProducts().then(products => {
                                const productIdMap = res.data.products.reduce((map, p) => {
                                    map[p.productId] = p;
                                    return map;
                                }, {});

                                // console.log(productIdMap);

                                const listProducts = products.filter(product => productIdMap[product.id]);
                                listProducts.forEach(item => {
                                    item.quantity = productIdMap[item.id]?.quantity || 0;
                                });
                                // console.log(listProducts);
                                setListItems(listProducts);
                            })
                    }).catch(err=>{
                        console.log(err)
                })
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    const getAllProducts=()=>{
        return axios.get('https://fakestoreapi.com/products')
            .then(res=>{
                return res.data
            }).catch(err=>{
                console.log(err);
        })
    };

    const handleDeleteItem=(itemId)=>{
        setListItems((prevListItems)=>prevListItems.filter(item=>item.id!=itemId));
        if (listItems){
            setSubTotal(0);
        }
    }

    const handleSubTotal=(value)=>{
        setSubTotal((prevSubTotal)=>prevSubTotal+value);
    }

    const getDiscount = () => {
        return (getSubTotal() * 0.2).toFixed(2);
    };

    const getFee=()=>{
        if (getSubTotal()>100){
            return fee;
        }
        return 0;
    }

    const getTotal = () => {
        return (getSubTotal()-getDiscount()+getFee()).toFixed(2);
    };

    const getSubTotal=()=>{
        let subTot = 0;
        listItems.forEach(item=>{
            subTot+=item.price*item.quantity;
        })
        return (subTot+subTotal).toFixed(2);
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="cart">
                    {(getUserId()==null) && <div className='text-center py-8 text-danger'>pls login to see your cart!</div>}

                    <div className="location">
                        <span>Home > Cart</span>
                    </div>

                    <div className="cart-title">
                        <span>Your cart</span>
                    </div>

                    <div className="cart-content">
                        <div className="cart-products">
                            {
                                [...listItems].map((item,index)=>{

                                    return(
                                        <CartItem
                                            onChangeQuantity={handleSubTotal}
                                            onDelete={handleDeleteItem}
                                            key={index}
                                            item={item}
                                        />
                                    );
                                })
                            }
                        </div>

                        <div className="cart-oder-summary">
                            <div className="list-prices">
                                <div className="list-prices-title">
                                    <span>Order Summary</span>
                                </div>
                                <div className="price-type">
                                    <span>Subtotal</span>
                                    <span>${getSubTotal()}</span>
                                </div>

                                <div className="price-type">
                                    <span>Discount (-20%)</span>
                                    <span className="discount">-${getDiscount()}</span>
                                </div>

                                <div className="price-type">
                                    <span>Delivery Fee</span>
                                    <span>${getFee()}</span>
                                </div>
                            </div>

                            <div className="total-price">
                                <span>Total</span>
                                <span>${getTotal()}</span>
                            </div>

                            <div className="promo-code">
                                <div className="input-code">
                                    <img src={images.icTag} alt=""/>
                                    <input type="text" placeholder={'Add promo code'}/>
                                </div>
                                <button>Apply</button>
                            </div>

                            <div className="btn-checkout">
                                <span>Go to Checkout</span>
                                <img src={images.icArrowRightLight} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Cart;