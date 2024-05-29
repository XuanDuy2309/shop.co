import React, {useEffect, useState} from 'react';
import Header from "../../layouts/header";
import Footer from "../../layouts/footer";
import './style.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Profile(props) {
    const [user,setUser] = useState({});

    const navigate = useNavigate();

    const getUserId=()=> {
        const parts = localStorage.getItem('token').split('.');
        return atob(parts[1]);
    }

    const getUserById=()=>{
        const userId = JSON.parse(getUserId()).sub;
        axios.get('https://fakestoreapi.com/users/'+userId)
        .then(res=>{
            if(res && res.data && res.data!=undefined && res.data!=null){
                setUser(res.data);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    // const getFirstname=(user)=>{
    //     return user.name['firstname'];
    // }
    // const getLastname=(user)=>{
    //     return user.name['lastname'];
    // }

    useEffect(()=>{
        getUserById();
    },[]);

    return (
        <div>
            <Header/>
            <div className="container">
                <div className="profile-wrapper">
                    <div className="profile-title">
                        <span>My profile</span>
                    </div>

                    <ul>
                        <li>Name</li>
                        <li>First name: {user?.name?.["firstname"]}</li>
                        <li>Last name: {user?.name?.["lastname"]}</li>
                    </ul>

                    <ul>
                        <li>Address</li>
                        <li>City: {user?.address?.['city']}</li>
                        <li>Street: {user?.address?.['street']}</li>
                        <li>Number: {user?.address?.['number']}</li>
                        <li>Zipcode: {user?.address?.['zipcode']}</li>
                    </ul>

                    <ul>
                        <span>Phone: {user.phone}</span>
                    </ul>

                    <div className="logout-btn">
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}

export default Profile;