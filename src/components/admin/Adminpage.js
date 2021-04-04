import React from 'react'
import styled  from 'styled-components';

import Leftside from '../main/navbar/Leftside';
import { objectsMain } from '../main/mainobject';
import AdminRightSide from '../main/navbar/rightside/Adminrightside';
import AdminSideBar from './adminsidebar/Adminsidebar';
import { Link, Route } from 'react-router-dom';
import { faHome, faCommentAlt, faEnvelopeOpenText, faReplyAll, faInbox, faCogs } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DashBoard from "./dashboard/Dashboard"
import Responded from './request/Responded';

library.add( faHome, faCommentAlt, faEnvelopeOpenText, faReplyAll, faInbox, faCogs )


const NavbarStyle = styled.div`
    justify-content: space-between;
    display: flex;
    padding:  8px;
    background-color: #102a36;
    height: 60px;
`;

const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const SideBarWrapper = styled.div`
    max-width: 240px;
    height: 100%;
    position: fixed;
    background: #102a36;
    border: 1px solid rgba(0, 0, 0, 0.1);
`

const items = {
    label1: 'DashBoard',
    label2: 'Responded',
    label3: 'Inbox',
    label4: 'Setting'
}


function Adminpage() {
    return (
        <>
            <div className="admin-page">
                <div style={{ position: "fixed" , top: '0', width: "100%", zIndex: "1"}}>
                    <NavbarStyle >
                        <div className="leftside">
                            <Leftside {...objectsMain}></Leftside>
                        </div>
                        <div className="rightside">
                            <AdminRightSide/>
                        </div>
                    </NavbarStyle>
                </div>
                <BottomWrapper>
                    <SideBarWrapper style={{ top: "78px" }}>
                        <div className="admin_sidebar">
                            <div className="sidebar-menu">
                                <li className="item">
                                    <Link to="/admin-section/dashboard" className="menu-btn">
                                        <label><FontAwesomeIcon icon="home"></FontAwesomeIcon></label>
                                        <span>{items.label1}</span>
                                    </Link>

                                    <Link to="/admin-section/responed-request" className="menu-btn">
                                        <label><FontAwesomeIcon icon="reply-all"></FontAwesomeIcon></label>
                                        <span>{items.label2}</span>
                                    </Link>

                                </li>
                            </div>
                        </div>
                    </SideBarWrapper>
                </BottomWrapper>
            </div>
            <Route exact={true} path="/admin-section/" component={ DashBoard }/>
            <Route path="/admin-section/dashboard" component={ DashBoard } />
            <Route path="/admin-section/responed-request" component={ Responded }/>
        </>
    )
}

export default Adminpage
