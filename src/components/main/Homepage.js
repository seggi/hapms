import React from 'react'

import styled from 'styled-components'


import { objectsMain } from './mainobject'
import Leftside from './navbar/Leftside'
import RightSide from './navbar/rightside/Rightside'

import './mainstyle.css'
import SideBar from './navbar/sidebar/Sidebar'
import MobileHomePage from './mobileview/Homepage'
import { BrowserRouter, Switch } from 'react-router-dom'


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


function HomePage() {
    
    return (
        <>
            <NavbarStyle>
                <div className="leftside">
                    <Leftside {...objectsMain} />
                </div>
                <div className="rightside">
                    <RightSide {...objectsMain} />
                </div>
            </NavbarStyle>
            <GlobalContent>
                <SideBar />
                <MobileHomePage {...objectsMain}/>
            </GlobalContent>
        </>
    )
}

export default HomePage
