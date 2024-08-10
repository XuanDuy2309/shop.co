import React, { useRef, useState, useEffect } from "react";
import images from "../../assets/images";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const [isCloseNotifi, setIsCloseNotifi] = useState(false);
  const [isOpenSearchMobile, setIsOpenSearchMobile] = useState(false);
  const [searchText,setSearchText] = useState("");

  const navigate = useNavigate();

  const handleActionUser = () => {
    localStorage.getItem("token") ? navigate("/user") : navigate("/login");
    // console.log(localStorage.getItem('token'));
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChangeInput = (e)=>{
    setSearchText(e.target.value);
  }


  const handleSearch = async ()=>{

    if (windowWidth > 1023){
        if (searchText.length===0) {
            alert('Please incorrect search text to search!');
            return;
        }
        navigate(`/category/all?search=${searchText}`);
    } else if(isOpenSearchMobile){
        if (searchText.length===0) {
            alert('Please incorrect search text to search!');
            return;
        }
        navigate(`/category/all?search=${searchText}`);
    } else {
        setIsOpenSearchMobile(!isOpenSearchMobile);
    }
  }
    
  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="header">
      <div className="wrapper" hidden={isCloseNotifi}>
        <div className="notifi">
          <div className="notifi-content">
            <span>
              Sign up and get 20% off to your first order.{" "}
              <a
                onClick={() => {
                  navigate("/shop.co");
                }}
              >
                Sign Up Now
              </a>
            </span>
          </div>

          <div
            className="ic-close"
            onClick={() => {
              setIsCloseNotifi(true);
            }}
          >
            <img src={images.icClose} alt="" />
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="header-logo">
          <label htmlFor="check-nav" className="mobile-menu">
            <img src={images.mobileNav} alt="" />
          </label>
          <div
            className="logo"
            onClick={() => {
              navigate("/shop.co");
            }}
            hidden={isOpenSearchMobile}
          >
            <img src={images.logo} alt="" />
          </div>
        </div>

        <div className="nav">
          <ul>
            <li>
              <span>Shop</span>
              <img src={images.icDropDown} alt="" />
            </li>

            <li>
              <span>On Sale</span>
            </li>

            <li>
              <span>New Arrivals</span>
            </li>

            <li>
              <span>Brands</span>
            </li>
          </ul>
        </div>

        <div className="user">
          <div className="search">
            <img
              src={images.icSearch}
              alt=""
              onClick={handleSearch}
            />
            <input
              type="text"
              placeholder="Search for products..."
              style={isOpenSearchMobile ? { display: "block" } : {}}
              onChange={(e)=>{handleChangeInput(e)}}
            />
          </div>
          <div className="user-cart">
            <img
              src={images.icCart}
              alt=""
              onClick={() => {
                navigate("/cart");
              }}
            />

            <img src={images.icAvatar} alt="" onClick={handleActionUser} />
          </div>
        </div>
      </div>

      <input
        id="check-nav"
        className="open-nav-mobile"
        type="checkbox"
        hidden={true}
      />

      <label htmlFor="check-nav" className="nav-overlay"></label>
      <div className="nav-mobile">
        <label htmlFor="check-nav" className="ic-close-mobile">
          <span>x</span>
        </label>
        <ul>
          <li>
            <span>Shop</span>
          </li>

          <li>
            <span>On Sale</span>
          </li>

          <li>
            <span>New Arrivals</span>
          </li>

          <li>
            <span>Brands</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
