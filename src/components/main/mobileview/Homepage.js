import React, {useState} from 'react'
import styled from 'styled-components'
import {FaFacebook, FaTwitter, FaWhatsapp} from 'react-icons/fa'

import DisplayAppointment from './Displayappointment'

import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import "./Homepage.css"
import { GetstartButton, CheckRequestButton } from '../button/Button'
import {mobileObjects} from "./Mobiledata"
import RequestPopup from './popup/Resquestpopup';
import RequestForm from './Form/Requestform';
import CheckRequestPopup from './popup/Checkrequest';
import CheckRequestForm from './Form/Checkrequestform';


// import { Link, Route } from 'react-router-dom'

const Content__box = styled.div`
    background: white;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 50px;
`

const Content__boxWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const AboutsContentBody = styled.span`
    color:  black;
    padding: 8px;
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    margin: 5px;
`

const ContactContentBody = styled.span `
    color:  black;
    padding: 8px;
    font-weight: 300;
    font-size: 22px;
    text-algin: left;
    display: flex;
    flex-direction: column;
    margin: 5px;
`

const LinkContentBody = styled.span `
    color:  black;
    padding: 8px;
    font-weight: 300;
    font-size: 22px;
    text-algin: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 30px;
`

const ScrollSmooth = styled.div`
    scroll-behavior: smooth;
`


function MobileHomePage({...objects}) {
    const [openPopup, setOpenPopup] = useState(false);
    const [openCheckPopup, setOpenCheckPopup] = useState(false);

    return (
        <>
            <div className="main__content-home">
                <div className="main_content-home top">
                    <div className="row">
                        <div className="row__leftside">
                            <h1>{objects.mainHomepage.msg}</h1>
                            <h2>{objects.mainHomepage.msgsub}</h2>
                           <div style={{ display: 'flex' }}>
                                <GetstartButton setOpenPopup={setOpenPopup}/>
                                <CheckRequestButton setOpenCheckPopup={setOpenCheckPopup}/>
                           </div>
                            
                        </div>
                        <div className="row_rightside">
                            <img src={objects.mainHomepage.img}/>
                        </div>
                    </div>
                </div>


                <div className="main_content-home bottom">
                    <div className="row">
                            <div className="row__leftside">
                                <h1 style={{color: 'black'}}>{objects.mainHomeText.msg}</h1>
                                <h2 style={{color: 'black'}}>{objects.mainHomeText.msgsub}</h2>
                            </div>
                        <div className="row_rightside">
                            <img src={objects.mainHomeText.img} 
                                style={{ marginLeft: "10px", width: "300px"}}
                                />
                        </div>
                    </div>
                </div>

                <DisplayAppointment />

                <div className="aboutus">
                    <div className="left-about">
                        <Content__box>
                            <h3>{mobileObjects.aboutus.title}</h3>
                            <Content__boxWrapper>
                                <AboutsContentBody >
                                        {mobileObjects.aboutus.body}
                                </AboutsContentBody >
                            </Content__boxWrapper>
                        </Content__box>
                    </div>

                    <div className="middle-contacte">
                        <Content__box>
                            <h3>{mobileObjects.contactus.title}</h3>
                            <Content__boxWrapper>
                                <ContactContentBody>
                                    {mobileObjects.contactus.body1}
                                    <br/>
                                    {mobileObjects.contactus.body2}
                                </ContactContentBody>
                            </Content__boxWrapper>
                        </Content__box>
                    </div>

                    <div className="right-about" id="footer">
                        <ScrollSmooth>
                            <Content__box>
                                <h3>{mobileObjects.more.title}</h3>
                                <Content__boxWrapper>
                                    <LinkContentBody>
                                        <a href="https://twitter.com/" 
                                            style={{ 
                                                marginLeft: "10px", 
                                                color:"#00fffe" , 
                                                marginLeft: "54px" , 
                                                }}>
                                            <FaTwitter/>
                                        </a>
            
                                        <a href="https://whatsapp.com/" 
                                            style={{ 
                                                marginLeft: "10px", 
                                                color:"green"  
                                                }}>
                                            <FaWhatsapp />
                                        </a>

                                        <a href="https://facebook.com/" 
                                            style={{ 
                                                marginLeft: "10px", 
                                                color:"blue", 
                                                marginRight: "54px" 
                                                }} >
                                            <FaFacebook />
                                        </a>
                                    </LinkContentBody>
                                </Content__boxWrapper>
                            </Content__box>
                        </ScrollSmooth>
                    </div>
                </div>
            </div>
            <>
                <RequestPopup
                    title={"Make an appointment request"}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    >
                    <RequestForm
                        //  updateRowid={updateRowid}
                        closeBox={setOpenPopup} />

                </RequestPopup>

                <CheckRequestPopup 
                    title={"Check your appointment request!"}
                    openPopup={openCheckPopup}
                    setOpenPopup={setOpenCheckPopup}
                >
                    <CheckRequestForm closeBox={setOpenCheckPopup} >
                    </CheckRequestForm>                
                </CheckRequestPopup>
            </>
        </>
    )
}

export default MobileHomePage
