import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import styled from 'styled-components'


import { objectsMain } from './mainobject'
import Leftside from './navbar/Leftside'
import LoginRightSide from './navbar/rightside/Loginrightside'

import './Login.css'
import { responsiveFontSizes } from '@material-ui/core'
import { login } from '../auth'

const GlobalContent = styled.div`
    display: flex;
    flex-deriction: row;
`
const NavbarStyle = styled.div`
    justify-content: space-between;
    display: flex;
    padding:  8px;
    background-color: #102a36;
    height: 60px;
`;


function Login() {
    const history = useHistory()
    const [ username, setUSername] = useState()
    const [ password, setPassword] = useState()
    const [message, setMessage] = useState()

    const onChangeUsername = (e) => {
        setUSername(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')

        const opts = {
            'username' : username,
            'password': password
        }

        if (username != '' && password != '') {
            fetch("http://localhost:5000/login", {
                method: "POST",
                    credentials: "same-origin", 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(opts)
                })
            .then(resp => resp.json())
            .then(result => {
                if (result.error) {
                    alert(result.error)
                }
                else {
                    if(result.accessToken){
                        console.log(result.accessToken)
                        login(result.accessToken)
                        history.push("/admin-section")
                    }
                    else{
                        setMessage(result.error)
                    }
                }
            })
        }
    }
    return (
        <>
             <NavbarStyle>
                <div className="leftside">
                    <Leftside {...objectsMain} />
                </div>
                <div className="rightside">
                    <LoginRightSide {...objectsMain} />
                </div>
            </NavbarStyle>
            <div className="login__box">
                <div className="login__box-content">
                    <h1>Login</h1>
                    <form>
                        <span>Enter username</span>
                        <input
                            type="text"
                            placeholder="Phone or Email"
                            value ={ username }
                            onChange={ onChangeUsername }
                            />

                        <span>Enter password</span>
                        <input
                            type="password"
                            placeholder="*******"
                            value ={ password }
                            onChange = { onChangePassword }
                            />
                        <input
                            type="submit"
                            value="Sign-In"
                            onClick = { handleSubmit }
                            />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
