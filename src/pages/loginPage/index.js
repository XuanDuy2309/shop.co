import React, {useState} from 'react';
import './style.css';
import Footer from "../../layouts/footer";
import images from "../../assets/images";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage(props) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: 'abc',
        password: 'abc',
    });

    const [showPass, setShowPass] = useState(false);
    const [isSuccess, setIsSuccess] = useState(null);


    const [errors, setErrors] = useState({});

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

        if (!formData.username.trim()) {
            validationErrors.username = 'Username is required';
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Submit the form data
        // console.log('Form data:', formData);
        axios.post('https://fakestoreapi.com/auth/login', {
            username: `${formData.username}`,
            password: `${formData.password}`,
        })
            .then(function (response) {
                if (response){
                    localStorage.setItem('token',response.data["token"]);
                    // console.log(response.data);
                    navigate('/');
                    // const token = response.data['token'];
                    // const parts = token.split('.')
                    // // console.log(parts);
                    // const user =window.atob(parts[1]);
                    // console.log(user);
                }
            })
            .catch(function (error) {
                setIsSuccess('Username or password is not match!');
            });
    };
    return (
        <div className="container-login">
            <div className="login-wrapper">
                <div className="header-login">
                    <img
                        src={images.logo}
                        alt=""
                        onClick={()=>{navigate('/')}}
                    />
                </div>

                <div className="form-login">
                    <form onSubmit={handleSubmit}>
                        <div className="form-title">
                            <span>Login</span>
                        </div>

                        {isSuccess && <div className="error text-danger font-size-14">{isSuccess}</div> }
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
                                type={showPass?'text':'password'}
                                id="password"
                                name="password"
                                placeholder={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <div className="error text-danger font-size-14">{errors.password}</div>}
                            {showPass ?
                                <div
                                    className={'is-show-pass'}
                                    onClick={()=>{setShowPass(!showPass)}}
                                >hide</div>:<div
                                    className={'is-show-pass'}
                                    onClick={()=>{setShowPass(!showPass)}}
                                >show</div>}
                        </div>

                        <div className="form-note">
                            <span>Have not acount? <a onClick={()=>{ navigate('/user/add')}}>register</a></span>
                        </div>

                        <div className="btn-login">
                            <button type={"submit"}>Login</button>
                        </div>
                    </form>
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default LoginPage;