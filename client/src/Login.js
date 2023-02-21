import React, { useState } from 'react';

import './Login.css';
/*
 Website: DIgitalOcean
 Title:How To Add Login Authentication to React Applications
 Author: Joe Morgan
 Published:  December 3, 2020
 Adapted from: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 line 48-59
 */
async function loginUser(credentials) {
    return fetch('http://sefdb02.qut.edu.au:3001/user/login', {
        method: 'POST',
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
        .then(res => {
            localStorage.setItem("token", res.token);
        });
}
function logOut() {
    localStorage.removeItem("token");
}
function logcheck() {
    console.log("----logcheck--");
    if (localStorage.getItem("token")===null) {
        console.log("token is null");
        return 0;
    }
    if (typeof localStorage.getItem("token") === 'object') {
        console.log("token is object");
        return 0;
    }
    if (typeof localStorage.getItem("token") === 'string') {
        console.log("token is string");
        if (localStorage.getItem("token") === 'undefined') {
            console.log("token is undefined");
            return 0;
        }
        else {
            console.log("token is good to go");
            return 1;
        }
    }
    console.log("---logcheck---");
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [passwords, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email: username,
            password: passwords
        });
        
    }

    return (
        <body>
        <div className="login-wrapper">
            <h2>Please Log In</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <h4>Email</h4>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <h4>Password</h4>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit" >Submit</button>
                </div>
                </form>
               
                    <button onClick={logOut}>LogOut</button>
               
           
            </div>
            </body>
    )
}

