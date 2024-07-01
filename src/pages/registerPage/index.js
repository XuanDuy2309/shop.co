import React, {useState} from 'react';
import './style.css';
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import images from "../../assets/images";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function RegisterPage(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: 'abc@gmail.com',
        username: 'abc',
        password: 'abc',
        name: {
            firstname: 'John',
            lastname: 'Doe',
        },
        address: {
            city: 'abc',
            street: 'abc',
            number: 123,
            zipcode: '1234-1234',
            geolocation: {
                lat: '0',
                long: '0',
            },
        },
        phone: '1234567890',
    });
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(null);


    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form data
        const validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (!formData.username.trim()) {
            validationErrors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters long';
        }

        if (!formData.name.firstname.trim()) {
            validationErrors.firstname = 'First name is required';
        }

        if (!formData.name.lastname.trim()) {
            validationErrors.lastname = 'Last name is required';
        }

        if (!formData.address.city.trim()) {
            validationErrors.city = 'City is required';
        }

        if (!formData.address.street.trim()) {
            validationErrors.street = 'Street is required';
        }

        if (!formData.address.number) {
            validationErrors.number = 'Number is required';
        }

        if (!formData.address.zipcode.trim()) {
            validationErrors.zipcode = 'Zip code is required';
        }

        if (!formData.phone.trim()) {
            validationErrors.phone = 'Phone is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit the form data
        // console.log('Form data:', formData);
        // Add your registration logic here
        axios.post('https://fakestoreapi.com/users', {
            email:  `${formData.email}`,
            username:`${formData.username}`,
            password:`${formData.password}`,
            name:{
                firstname:`${formData.name.firstname}`,
                lastname:`${formData.name.lastname}`
            },
            address:{
                city:`${formData.address.city}`,
                street:`${formData.address.street}`,
                number:formData.address.number,
                zipcode:`${formData.address.zipcode}`,
                geolocation:{
                    lat:`${formData.address.geolocation.lat}`,
                    long:`${formData.address.geolocation.long}`
                }
            },
            phone:`${formData.phone}`
        })
            .then(function (response) {
                if (response){
                    // localStorage.setItem('token',response.data["token"]);
                    console.log(response.data);
                    navigate('/shop.co');
                    // const token = response.data['token'];
                    // const parts = token.split('.')
                    // // console.log(parts);
                    // const user =window.atob(parts[1]);
                    // console.log(user);
                }
            })
            .catch(function (error) {
                setIsSuccess("Register is fail!")
                console.log(error);
            });
    };
    return (
        <div className="container-register">
            <div className="register-wrapper">
                <div className="header-register">
                    <img
                        src={images.logo}
                        alt=""
                        onClick={()=>{navigate('/shop.co')}}
                    />
                </div>

                <div className="form-register">
                    <form action=""
                          onSubmit={handleSubmit}
                    >
                        <div className="form-title">
                            <span>Register</span>
                        </div>

                        {isSuccess && <div className="error text-danger font-size-14">{isSuccess}</div>}

                        <div className="form-input">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="error text-danger font-size-14">{errors.email}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder={formData.username}
                                onChange={handleInputChange}
                            />
                            {errors.username && <div className="error text-danger font-size-14">{errors.username}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <div className="error text-danger font-size-14">{errors.password}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="firstname">First Name:</label>
                            <input
                                type="text"
                                id="firstname"
                                name="name.firstname"
                                placeholder={formData.name.firstname}
                                onChange={handleInputChange}
                            />
                            {errors.firstname && <div className="error text-danger font-size-14">{errors.firstname}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="lastname">Last Name:</label>
                            <input
                                type="text"
                                id="lastname"
                                name="name.lastname"
                                placeholder={formData.name.lastname}
                                onChange={handleInputChange}
                            />
                            {errors.lastname && <div className="error text-danger font-size-14">{errors.lastname}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="city">City:</label>
                            <input
                                type="text"
                                id="city"
                                name="address.city"
                                placeholder={formData.address.city}
                                onChange={handleInputChange}
                            />
                            {errors.city && <div className="error text-danger font-size-14">{errors.city}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="street">Street:</label>
                            <input
                                type="text"
                                id="street"
                                name="address.street"
                                placeholder={formData.address.street}
                                onChange={handleInputChange}
                            />
                            {errors.street && <div className="error text-danger font-size-14">{errors.street}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="number">Number:</label>
                            <input
                                type="number"
                                id="number"
                                name="address.number"
                                placeholder={formData.address.number}
                                onChange={handleInputChange}
                            />
                            {errors.number && <div className="error text-danger font-size-14">{errors.number}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="zipcode">Zip Code:</label>
                            <input
                                type="text"
                                id="zipcode"
                                name="address.zipcode"
                                placeholder={formData.address.zipcode}
                                onChange={handleInputChange}
                            />
                            {errors.zipcode && <div className="error text-danger font-size-14">{errors.zipcode}</div>}
                        </div>

                        <div className="form-input">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <div className="error text-danger font-size-14">{errors.phone}</div>}
                        </div>

                        <div className="form-note">
                            <span>Have acount? <a onClick={()=>{ navigate('/login')}}>Login</a></span>
                        </div>

                        <div className="form-note">
                            <input type="checkbox" required={true}/>
                            <span>By creating an account you agree to our <a href="">Terms & Privacy</a>.</span>
                        </div>

                        <div className="btn-register">
                            <button type={"submit"}>Sign up</button>
                        </div>
                    </form>
                </div>

            </div>
            <Footer/>

        </div>

    );
}

export default RegisterPage;