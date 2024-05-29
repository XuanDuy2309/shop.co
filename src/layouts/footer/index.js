import React from 'react';
import './style.css'
import images from "../../assets/images";

function Footer(props) {
    return (
        <div className="footer">
            <div className="contact">
                <div className="contact-wrapper">
                    <div className="contact-status">
                        <span>STAY UPTO DATE ABOUT OUR LATEST OFFERS</span>
                    </div>

                    <div className="contact-form">
                        <div className="email-input">
                            <img src={images.mail} alt=""/>
                            <input type="text" placeholder={"Enter your email address"}/>
                        </div>

                        <button>Subscribe to Newsletter</button>
                    </div>
                </div>

            </div>

            <div className="about-wrapper">
                <div className="abouts">
                    <div className="about">
                        <div className="about-title">
                            <img src={images.logo} alt=""/>
                        </div>

                        <div className="about-content">
                        <span>
                            We have clothes that suits your style and which you’re proud to wear. From women to men.
                        </span>
                        </div>

                        <div className="ic-contact">
                            <img src={images.icContact1} alt=""/>
                            <img src={images.icContact2} alt=""/>
                            <img src={images.icContact3} alt=""/>
                            <img src={images.icContact4} alt=""/>
                        </div>
                    </div>

                    <div className="sub-abouts">
                        <div className="about">
                            <div className="about-title">
                                <span>Company</span>
                            </div>

                            <div className="about-content">
                                <span>About</span>
                                <span>Features</span>
                                <span>Works</span>
                                <span>Career</span>
                            </div>
                        </div>

                        <div className="about">
                            <div className="about-title">
                                <span>Help</span>
                            </div>

                            <div className="about-content">
                                <span>Customer Support</span>
                                <span>Delivery Details</span>
                                <span>Terms & Conditions</span>
                                <span>Privacy Policy</span>
                            </div>
                        </div>

                        <div className="about">
                            <div className="about-title">
                                <span>FAQ</span>
                            </div>

                            <div className="about-content">
                                <span>Account</span>
                                <span>Manage Deliveries</span>
                                <span>Orders</span>
                                <span>Payments</span>
                            </div>
                        </div>

                        <div className="about">
                            <div className="about-title">
                                <span>Resources</span>
                            </div>

                            <div className="about-content">
                                <span>Free eBooks</span>
                                <span>Development Tutorial</span>
                                <span>How to - Blog</span>
                                <span>Youtube Playlist</span>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="payment">
                    <span>Shop.co © 2000-2023, All Rights Reserved</span>
                    <div className="payment-method">
                        <img src={images.icPayment1} alt=""/>
                        <img src={images.icPayment2} alt=""/>
                        <img src={images.icPayment3} alt=""/>
                        <img src={images.icPayment4} alt=""/>
                        <img src={images.icPayment5} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;