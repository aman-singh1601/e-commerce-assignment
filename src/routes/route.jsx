
import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { logoutUser } from '../fakebackend/auth';

const AuthMiddleware = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default AuthMiddleware;