import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import './style.css';
import Header from '../../layouts/header'
import Footer from "../../layouts/footer";
import ListProducts from "../../layouts/listProducts";
import CommentCard from "../../components/commentCard/commentCard";
import Slider from "react-slick";
import images from "../../assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function Homepage() {
    const [numComments,setNumComments] = useState(3);
    const [listArrivals,setListArrivals] = useState([]);
    const [listTopSell,setListTopSell] = useState([]);
    const [listCate,setListCate] = useState([]);

    const listCmt = Array(8).fill(0);

    const getListArrivals=()=>{
        axios.get("https://fakestoreapi.com/products/category/women's clothing?limit=4")
            .then(res=>{
                if(Array.isArray(res.data)){
                    setListArrivals(res.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getListTopSell=()=>{
        axios.get("https://fakestoreapi.com/products/category/men's clothing?limit=4")
            .then(res=>{
                if(Array.isArray(res.data)){
                    setListTopSell(res.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getListCate=()=>{
        axios.get("https://fakestoreapi.com/products/categories")
            .then(res=>{
                if(Array.isArray(res.data)){
                    setListCate(res.data);
                    // console.log(res.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const settings = {
        className: "center",
        centerMode: (numComments==1)?false:true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: numComments,
        speed: 500,
    };

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    window.addEventListener("resize",()=>{
        if (window.innerWidth<=1050){
            setNumComments(1);
        } else {
            setNumComments(3);
        }
    })



    useEffect(()=>{
        getListArrivals();
        getListTopSell();
        getListCate();
    },[])
  return (
      <div className="main">
          <Header />
          <div className="container">
              <div className="poster">
                  <div className="poster-content">
                      <div className="poster-des">
                          <div className="poster-title">
                              <span>Find clothes that macthes your style</span>
                          </div>

                          <div className="poster-tip">
                              <span>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</span>
                          </div>

                          <button className="shop-btn">Shop Now</button>

                          <div className="statistics">
                              <div className="brands">
                                  <span className="quantity">200+</span>
                                  <span>International Brands</span>
                              </div>

                              <div className="brands">
                                  <span className="quantity">2,000+</span>
                                  <span>High-Quality Products</span>
                              </div>

                              <div className="brands">
                                  <span className="quantity">30,000+</span>
                                  <span>Happy Customers</span>
                              </div>
                          </div>
                      </div>
                      
                      <div className="poster-img">
                          <img src={images.posterImg} alt=""/>
                      </div>
                  </div>
              </div>

              <div className="local-brands">
                  <div className="list-local">
                      <img src={images.logoVersace} alt=""/>
                      <img src={images.logoZara} alt=""/>
                      <img src={images.logoGucci} alt=""/>
                      <img src={images.logoPrada} alt=""/>
                      <img src={images.logoKlein} alt=""/>
                  </div>
              </div>

              <div className="new-arrivals">
                  <ListProducts
                      listProducts={listArrivals}
                      title={"New Arrivals"}
                  />
              </div>

              <div className="top-selling">
                  <ListProducts
                      listProducts={listTopSell}
                      title={"Top Selling"}
                  />
              </div>

              <div className="dress-style">
                  <div className="dress-title">
                      <span>BROWSE BY dress STYLE</span>
                  </div>

                  <div className="list-dress">
                      {
                          listCate.map((item,index)=>{
                              const imagePath = `${images[`dress${index + 1}`]}`;
                              return (
                                  <Link key={index} to={'/category/' + item}>
                                      {
                                          <img src={imagePath} alt="" />
                                      }
                                  </Link>
                              );
                          })
                      }
                  </div>
              </div>

              <div className="cmt-list">
                  <div className="cmt-list-title">
                      <span>OUR HAPPY CUSTOMERS</span>
                      <div className="cmt-btn">
                          <img src={images.arrowL} alt="" onClick={previous}/>
                          <img src={images.arrowR} alt="" onClick={next}/>
                      </div>
                  </div>

              </div>
              <div className="comments">
                  <Slider
                      {...settings}
                      ref={slider => {
                          sliderRef = slider;
                      }}
                  >
                      {
                          listCmt.map((index)=>{
                              return(
                                  <CommentCard key={index} rate={5}/>
                              );
                          })
                      }
                  </Slider>
              </div>
          </div>
          <Footer/>
      </div>
  )
}
