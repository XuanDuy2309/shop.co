import React, {useEffect, useRef, useState} from 'react';
import './style.css';
import Header from '../../layouts/header';
import Footer from "../../layouts/footer";
import images from "../../assets/images";
import {useNavigate, useParams} from "react-router-dom";
import {Rating} from "react-simple-star-rating";
import axios from "axios";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";

function ProductDetailPage(props) {
    const [x, setX] = useState(0);
    const [col, setCol]= useState(0);
    const [quantity, setQuantity]=useState(1);
    const [product,setProduct] = useState({});
    const [listCartProducts, setListCartProducts] = useState([]);
    const [successMess,setSuccessMess]=useState(null)

    const slideImgs = useRef();
    const listSizes = useRef();

    const navigate = useNavigate();

    const productId = +useParams().productId;

    const getProduct=()=>{
        axios.get('https://fakestoreapi.com/products/'+productId)
            .then(res=>{
                if(res.data!=undefined&&res.data!=null){
                    setProduct(res.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getUserId = () => {
        const parts = localStorage.getItem('token')?.split('.');
        return parts ? JSON.parse(atob(parts[1])).sub : null;
    };

    const getListCartProduct=()=>{
         try {
             axios.get('https://fakestoreapi.com/carts/'+getUserId())
                 .then(res=>{
                     setListCartProducts(res.data.products);
                 })
                 .catch(err=>{
                     console.log(err.message);
                 })
         } catch (err) {
             console.log(err.message);
         }
    }


    const handleAddToCart =()=>{
        try {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            console.log(dateString);
            if(listCartProducts){
                // console.log(listCartProducts);
                axios.put('https://fakestoreapi.com/carts/'+getUserId(),{
                    userId: getUserId(),
                    date: dateString,
                    products: [...listCartProducts,{productId: productId, quantity: quantity}]
                })
                    .then(res=>{
                        console.log(res.data);
                        setSuccessMess('Add to cart is success!')
                    })
                    .catch(err=>{
                        console.log(err.message);
                    })
            }

        }
        catch (err){
            console.log(err);
        }
    }

    const colors = [
      '#4F4631',
      '#314F4A',
      '#31344F',
    ];
    const sizes = [
        'Small',
        'Medium',
        'Large',
        'X-Large',
    ];

    let current = 0;

    const handleAddProduct=()=>{
        setQuantity((prevQuan)=>prevQuan+1);
    }
    const handleMinusProduct=()=>{
        if (quantity>1){
            setQuantity((prevQuan)=>prevQuan-1);
        }
    }
    const handleSlideShow=()=> {
        if (current == 2) {
            current=0;
            setX(0);
        } else {
            current++;
            setX((prevX) => prevX - getWidth());
        }
    }

    const getWidth = () =>{
        if (slideImgs){
            return slideImgs.current.offsetWidth;
        }
    }

    const getRate = (product) => {
        if (product && product.rating && typeof product.rating.rate === 'number') {
            return product.rating.rate;
        } else {
            return 0;
        }
    };

    const handleSelectSize =(event)=>{
        for (let item of listSizes.current.children){
            item.classList.remove('selected');
        }
        event.currentTarget.classList.add('selected');
    }

    useEffect(() => {
        setInterval(handleSlideShow,5000);
        // console.log(sizes.current.children);
        for (let item of listSizes.current.children){
            item.addEventListener('click',handleSelectSize)
        }
        getProduct();
        getListCartProduct();

    }, []);
    return (
        <div>
            <Header/>
            <div className="container">
                <div className="product-detail">
                    {successMess && <div className="text-center py-8 bg-success text-white">{successMess}</div>}
                    <div className="location">
                        <span>
                            Home > Shop > Men > T-shirts
                        </span>
                    </div>

                    <div className="product-info">
                        <div className="product-img">
                            <div className="list-imgs">
                                <img src={product.image} alt=""/>
                                <img src={product.image} alt=""/>
                                <img src={product.image} alt=""/>
                            </div>
                            <div className="slide-img" >
                                <div className="slide-img-item" style={{
                                    transform: `translateX(${x}px)`,
                                    transition: `transform linear .3s`
                                }}>
                                    <img src={product.image} alt="" ref={slideImgs}/>
                                    <img src={product.image} alt=""/>
                                    <img src={product.image} alt=""/>


                                </div>
                            </div>
                        </div>

                        <div className="product-about">
                            <div className="product-name">
                                <span>{product.title}</span>
                            </div>

                            <div className="product-rate">
                                <Rating
                                    readonly={true}
                                    initialValue={getRate(product)}
                                    allowFraction={true}
                                    size={24}
                                />
                                <span>{getRate(product)}/5</span>
                            </div>

                            <div className="product-price">
                                <span>${product.price}</span>
                            </div>

                            <div className="product-describe">
                                <span>{product.description}</span>
                            </div>

                            <div className="product-picking">
                                <div className="select-col">
                                    <span>Select Colors</span>
                                    <div className="list-col">
                                        {
                                            colors.map((item,index)=>{
                                                return(
                                                    <div
                                                        className="" key={index}
                                                        onClick={()=>{setCol(index)}}
                                                        style={{backgroundColor: item}}
                                                    >{col==index?'X':''}</div>
                                                );
                                            })
                                        }
                                    </div>

                                </div>

                                <div className="select-size">
                                    <span>Choose Size</span>
                                    <div className="list-size" ref={listSizes}>
                                        {
                                            sizes.map((item,index)=>{
                                                return(
                                                    <div key={index}>{item}</div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="select-quantity">
                                    <div className="product-quan">
                                        <img src={images.icMinus} alt="" onClick={handleMinusProduct}/>
                                        <span>{quantity}</span>
                                        <img src={images.icAdd} alt="" onClick={handleAddProduct}/>
                                    </div>

                                    <div className="btn-add-cart">
                                        <button onClick={handleAddToCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ProductDetailPage;