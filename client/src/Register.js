import React, { useState } from 'react';

import './Register.css';
/*
 Website: DIgitalOcean
 Title:How To Add Login Authentication to React Applications
 Author: Joe Morgan
 Published:  December 3, 2020
 Adapted from: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 line: 27-37
 */
async function loginUser(credentials) {
    return fetch('http://sefdb02.qut.edu.au:3001/user/register', {
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

export default function Register() {
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
        <div className="login-wrapper">
            <h2>Please register account</h2>
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
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

