import React, { Fragment, useState, useEffect } from 'react'
import { NormalButton, SignupButton } from '../../button/Button'

import "./Sidebar.css"

function Sidebar({width, height, children}) {
    const [xPosition, setX] = useState(-width);

    const toggleMenu = () => {
        if (xPosition < 0) {
          setX(0);
        } else {
          setX(-width);
        }
    };
    

    useEffect(() => {
       setX(0);
    },[]);

    return (
        <>
            <Fragment>
                <div className="side-bar" 
                    style={{ 
                            transform: `translatex(${xPosition}px)`,
                            width: width,
                            minHeight: height,
                            transition: "0.8s ease"
                            }} >
                    <button
                        onClick={() => toggleMenu()}
                        className="toggle-menu"
                        style={{
                            transform: `translate(${width}px, 20vh)`
                        }}
                        ></button>
                    <div className="sibebar__content">
                        {children}
                    </div>
                </div>
            </Fragment>
        </>
    )
}

function SideBar() {
    return (
        <>
            <Sidebar width={'300'} height={"100vh"} >
                <div className="sidebar__column"><NormalButton/></div>
                <div className="sidebar__column signupbtn"><SignupButton/></div>
            </Sidebar>
        </>
    )
}

export default SideBar
