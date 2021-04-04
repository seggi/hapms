import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { objectsMain } from '../mainobject';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../auth';

library.add( faSignOutAlt )

const Button = styled.a`  
    background: ${props => props.primary ? "#133db0" : "transparent"}; 
    color: ${props => props.primary ? "white" : "white"};
    font-size:  ${props => props.primary ? "1.3em": "1.2em"};
    font-weight: 600;
    margin:  1em;
    padding: 0.25em 1em;
    border: ${props => props.primary ? "2px solid #133db0" : "none"};
    border-radius:  3px;
    text-align: center;
    text-decoration: none;
    &:hover{
        cursor: pointer;
        background: ${props => props.primary ? "transparent" : "white"}; 
        color: ${props => props.primary ? "white" : "#333"};
    }
` 

const Button1 = styled.button`  
    background: ${props => props.primary ? "#133db0" : "transparent"}; 
    color: ${props => props.primary ? "white" : "white"};
    font-size:  ${props => props.primary ? "1.3em": "1.2em"};
    font-weight: 600;
    margin:  1em;
    padding: 0.25em 1em;
    border: ${props => props.primary ? "2px solid #133db0" : "none"};
    border-radius:  3px;
    text-align: center;
    text-decoration: none;
    &:hover{
        cursor: pointer;
        background: ${props => props.primary ? "transparent" : "white"}; 
        color: ${props => props.primary ? "white" : "#333"};
    }
`

const ButtonLink = styled(Link)`  
    background: ${props => props.primary ? "#133db0" : "transparent"}; 
    color: ${props => props.primary ? "white" : "white"};
    font-size:  ${props => props.primary ? "1.3em": "1.2em"};
    font-weight: 600;
    margin:  1em;
    padding: 0.25em 1em;
    border: ${props => props.primary ? "2px solid #133db0" : "none"};
    border-radius:  3px;
    text-align: center;
    text-decoration: none;
    &:hover{
        cursor: pointer;
        background: ${props => props.primary ? "transparent" : "white"}; 
        color: ${props => props.primary ? "white" : "#333"};
    }
`   
const ButtonWrapper = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: blue;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
    padding: 10px;
    margin-right: 30px;
`

const ButtonLogout = styled(Link)`
    color: #fff;
    font-size: 22px;
    align-content: center;
`

// const ButtonSpan = styled.span`
//     text-align: center;
//     margin-top: -10px;
// `

export function SignupButton() {
    return (
        <>
            <ButtonLink primary to="/signup-page">
                {objectsMain.signup}
            </ButtonLink>
        </>
    )
}

export function AboutusButton() {
    return (
        <>
            <Button href="#footer">
                {objectsMain.abouts}
            </Button>
        </>
    )
}

export function NormalButton() {
    return (
        <>
            <ButtonLink to="/login">
                {objectsMain.admin}
            </ButtonLink>
        </>
    )
}

export function GetstartButton(props) {
    return (
        <>
            <Button1 primary style={{
                padding: '12px',
                fontWeight: '600',
                width: "300px",
                }}
                onClick = {() => { props.setOpenPopup(true)}}
                >
                {objectsMain.getstart}
            </Button1>
        </>
    )
}

export function CheckRequestButton(props) {
    return (
        <>
            <Button1 primary style={{
                padding: '12px',
                fontWeight: '600',
                width: "300px",
                background: "green",
                border: "1px solid green"
                }}
                onClick = {() => { props.setOpenCheckPopup(true)}}
                >
                {objectsMain.checkrequestbutton}
            </Button1>
        </>
    )
}

export function LogoutButton() {
    return (
        <> 
            <ButtonWrapper>
                <ButtonLogout  onClick={() => logout() }>
                    <FontAwesomeIcon icon="sign-out-alt">
                    </FontAwesomeIcon>
                </ButtonLogout>
            </ButtonWrapper>
        </>
    )
}

export function HomeButton() {
    return (
        <>
            <ButtonLink to="/">
                Home
            </ButtonLink>
        </>
    )
}
