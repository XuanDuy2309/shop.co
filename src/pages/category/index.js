import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import images from "../../assets/images";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import ListProducts from "../../layouts/listProducts";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

function CategoryPage(props) {
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [color, setColor] = useState(0);
  const [listCateProducts, setListCateProducts] = useState([]);
  const [listCate, setListCate] = useState([]);

  const listSizes = useRef();
  const filters = useRef();
  const filter = useRef();

  const navigate = useNavigate();

  const cate = useParams();
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('search'));

  const getListCateProducts = async () => {
    if (cate.cateName == "all") {
      await axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          if (Array.isArray(res.data)) {
            // setListCateProducts(res.data);
            if (searchParams.get("search")) {
              const searchTxt = searchParams.get("search");
            //   console.log(res.data);
              //   console.log(
              //     res.data.filter((item) =>
              //       item.title.toLowerCase().includes(searchTxt.toLowerCase())
              //     )
              //   );
              setListCateProducts(
                res.data.filter((item) =>
                  item.title.toLowerCase().includes(searchTxt.toLowerCase()|| item.description.toLowerCase().includes(searchTxt.toLocaleLowerCase()))
                )
              );
            }
            else {
                setListCateProducts(res.data);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      await axios
        .get("https://fakestoreapi.com/products/category/" + cate.cateName)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setListCateProducts(res.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getListCate = () => {
    try {
      axios
        .get("https://fakestoreapi.com/products/categories")
        .then((res) => {
          if (Array.isArray(res.data)) {
            setListCate(res.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSelectSize = (event) => {
    // for (let item of listSizes.current.children){
    //     item.classList.remove('selected');
    // }
    // console.log(event.currentTarget.classList.contains('selected'));
    if (event.currentTarget.classList.contains("selected")) {
      event.currentTarget.classList.remove("selected");
    } else {
      event.currentTarget.classList.add("selected");
    }
    // console.log(event.currentTarget.classList);
  };

  const handleChangePrice = (event) => {
    setPriceRange(event);
  };

  const handleScrollToTop = () => {
    filters.current.scrollTop = 0;
  };

  const cols = [
    "#00C12B",
    "#F50606",
    "#F5DD06",
    "#F57906",
    "#06CAF5",
    "#063AF5",
    "#F50606",
    "#F506A4",
    "#FFFFFF",
    "#000000",
  ];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  useEffect(() => {
    for (let item of listSizes.current.children) {
      item.addEventListener("click", handleSelectSize);
    }
    getListCateProducts();
    getListCate();
    // console.log(filter.current);
  }, [listCateProducts]);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="category">
          <div className="location">
            <span>{"Home > Casual"}</span>
          </div>

          <div className="category-content">
            <input
              id={"checked-filters"}
              className={"check-filters"}
              type="checkbox"
              hidden={true}
            />
            <div className="filters" ref={filters}>
              <div className="filter">
                <div className="filter-title">
                  <span>Filters</span>
                  <label htmlFor="checked-filters" onClick={handleScrollToTop}>
                    <img
                      src={images.icCloseSolid}
                      className="ic-close-filter-mobile"
                      alt=""
                    />
                  </label>
                  <img src={images.icFillter} className="ic-filter" alt="" />
                </div>

                <div className="filter-type">
                  <div className="type-product">
                    <span>T-shirts</span>
                    <img src={images.icDropRight} alt="" ref={filter} />
                  </div>

                  <div className="type-product">
                    <span>Shorts</span>
                    <img src={images.icDropRight} alt="" />
                  </div>

                  <div className="type-product">
                    <span>Shirts</span>
                    <img src={images.icDropRight} alt="" />
                  </div>

                  <div className="type-product">
                    <span>Hoodie</span>
                    <img src={images.icDropRight} alt="" />
                  </div>

                  <div className="type-product">
                    <span>Jeans</span>
                    <img src={images.icDropRight} alt="" />
                  </div>
                </div>
              </div>

              <div className="filter">
                <div className="filter-title">
                  <span>Price</span>
                  <img src={images.icDropUp} alt="" ref={filter} />
                </div>

                <div className="filter-type">
                  <RangeSlider
                    min={0}
                    max={250}
                    defaultValue={[50, 200]}
                    onInput={handleChangePrice}
                  />
                  <div className="value-price">
                    {priceRange.map((item, index) => {
                      return <span key={index}>${item}</span>;
                    })}
                  </div>
                </div>
              </div>

              <div className="filter">
                <div className="filter-title">
                  <span>Color</span>
                  <img src={images.icDropUp} alt="" />
                </div>

                <div className="filter-color">
                  {cols.map((item, index) => {
                    return (
                      <div
                        className="color-picker"
                        key={index}
                        onClick={() => {
                          setColor(index);
                        }}
                        style={{ backgroundColor: item }}
                      >
                        {color == index ? "X" : ""}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="filter">
                <div className="filter-title">
                  <span>Size</span>
                  <img src={images.icDropUp} alt="" />
                </div>

                <div className="filter-size" ref={listSizes}>
                  {sizes.map((item, index) => {
                    return (
                      <div className="size-item" key={index}>
                        {item}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="filter">
                <div className="filter-title">
                  <span>Dress Style</span>
                  <img src={images.icDropUp} alt="" />
                </div>

                <div className="filter-type">
                  {listCate.map((item, index) => {
                    return (
                      <div
                        className="type-product"
                        key={index}
                        onClick={() => {
                          navigate("/category/" + item);
                        }}
                      >
                        <span>{item}</span>
                        <img src={images.icDropRight} alt="" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="btn-apply">
                <label htmlFor={"checked-filters"} onClick={handleScrollToTop}>
                  Apply Filter
                </label>
              </div>
            </div>

            <div className="cate-products">
              <div className="product-style">
                <div className="style-name">
                  <span>{cate.cateName}</span>
                  <span>Showing 1-10 of 100 Products</span>
                </div>
                <div className="sort-by">
                  <span>sort by: </span>
                  <select name="" id="">
                    <option value="">Most Polular</option>
                  </select>
                </div>

                <label
                  htmlFor={"checked-filters"}
                  className="ic-open-filters-mobile"
                >
                  <img src={images.icFillter} alt="" />
                </label>
              </div>

              <div className="list-cate">
                <ListProducts listProducts={listCateProducts} />
              </div>
            </div>
            <label
              htmlFor="checked-filters"
              className={"overlay-category"}
              onClick={handleScrollToTop}
            ></label>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
