import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

function Index(props) {
    const navigate = useNavigate()
    return (
        <button className='btn-viewAll' onClick={()=>{navigate('/category/all')}}>View All</button>
    );
}

export default Index;