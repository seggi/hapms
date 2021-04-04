import React, { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faReplyAll, faInbox, faCheck} from '@fortawesome/free-solid-svg-icons'

import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

import styled from 'styled-components';


import "../adminpage.css"
import { authFetch } from '../../auth';

const BtnConfirm = styled.button`
    color: #b0a99d;
    font-size: '18px';
    border: none;
    background: none;
    margin-left: 10px;
    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:hover {
        cursor: pointer;
    }
`
const BtnResponded = styled.button`
    color: green;
    font-size: '18px';
    border: none;
    background: none;
    margin-left: 10px;
    &:focus {
        outline: none;
        box-shadow: none;
    }

    &:hover {
        cursor: pointer;
    }
`

library.add( faCalendar, faUser, faReplyAll, faInbox, faCheck )

function DashBoard() {
    const [datas, setDatas] = useState([])
    const [updateDatas, setUpdateDatas] = useState([])
    const [pnumber, setPnumber] = useState()
    const [apnumber, setApnumber] = useState()
    const [confirmation, setConfirmation] = useState()
    const [updatepnumber, setUpdatePnumber] = useState()
    const [updateapnumber, setUpdateApnumber] = useState()

    const confirmRow = (id, confirm) => {
        let rowid = {
            'confirmrequest': id,
            'confirmv': confirm
        }
        // setConfirmation(rowid)
        authFetch("http://localhost:5000/main/api/confirm_request", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rowid)
        })
        .then(resp => resp.json())
        .then(result => {

        if (result.data && result.data1){
            for (let x in result.data) {
                setUpdatePnumber(result.data[x].pnumber);
                setUpdateApnumber(result.data[x].apnumber);
            }

            let getcollecttable = result.data1.map((item, index) => {
                let getdatas = {
                    id: item.id,
                    fullname: item.fullname, 
                    appointment: `${item.appointment_date} at ${item.appointment_time}`,
                    contacte: item.contacte,
                    sent_date: item.sent_date,
                    description: item.description,
                    getonhold: item.onhold,
                    onhold: item.onhold !== 1  ? <span style={{ color: 'red' }}>
                                                        <FontAwesomeIcon icon="inbox">
                                                        </FontAwesomeIcon>
                                                    </span> 
                                                : <span style={{ color: 'green' }}>
                                                        <FontAwesomeIcon icon="reply-all">
                                                        </FontAwesomeIcon>
                                                </span>
                }
                return getdatas;
            })

            setUpdateDatas(getcollecttable)
        }
        else if(result.error) {
            alert(result.error)
        }
    })
    }

    useEffect(() => {
            authFetch("http://localhost:5000/main/api/get_collection_data", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(result => {
            if (result.data && result.data1){
                for (let x in result.data) {
                    setPnumber(result.data[x].pnumber);
                    setApnumber(result.data[x].apnumber);
                }

                let getcollecttable = result.data1.map((item, index) => {
                    let getdatas = {
                        id: item.id,
                        fullname: item.fullname, 
                        appointment: `${item.appointment_date} at ${item.appointment_time}`,
                        contacte: item.contacte,
                        sent_date: item.sent_date,
                        description: item.description,
                        getonhold: item.onhold,
                        onhold: item.onhold !== 1  ? <span style={{ color: 'red' }}>
                                                            <FontAwesomeIcon icon="inbox">
                                                            </FontAwesomeIcon>
                                                        </span> 
                                                    : <span style={{ color: 'green' }}>
                                                            <FontAwesomeIcon icon="reply-all">
                                                            </FontAwesomeIcon>
                                                    </span>
                    }
                    return getdatas;
                })

                setDatas(getcollecttable)
            }
            else if(result.error) {
                alert(result.error)
            }
        })
    }, [])

    const columns = [
        { 
            Header: "ID",
            accessor: 'id',
            sortable: true,
            filterable: false,
            style: {
                textAlign: "center",
            },
            width: 100,
            maxWidth: 100,
            minWidth: 100

        },

        { 
            Header: "Client",
            accessor: 'fullname',
            sortable: true,
            filterable: false,
            style: {
                textAlign: "center",
            },
            // width: 100,
            // maxWidth: 100,
            // minWidth: 100
        },

        { 
            Header: "Appointment",
            accessor: 'appointment',
            sortable: true,
            filterable: false,
            style: {
                textAlign: "center",
            },
            width: 200,
            maxWidth: 200,
            minWidth: 200
        },

        { 
            Header: "Contacte",
            accessor: 'contacte',
            sortable: true,
            filterable: false,
            style: {
                textAlign: "center",
            },
            width: 100,
            maxWidth: 100,
            minWidth: 100

        },

        { 
            Header: "Sent date",
            accessor: "sent_date",
            sortable: true,
            filterable: true,
            style: {
                textAlign: "center",
            },
            width: 200,
            maxWidth: 200,
            minWidth: 200
        },

        { 
            Header: "Description",
            accessor: "description",
            sortable: true,
            filterable: true,
        },

        { 
            Header: "Inbox",
            accessor: "onhold",
            style: {
                textAlign: "center",
            },
            width: 60,
            maxWidth: 60,
            minWidth: 60
        },

        { 
            Header: "Actions",
            Cell: props => {
                return (
                    <>
                        { props.original.getonhold !== 1 ? <BtnConfirm
                            onClick={(() => { 
                                confirmRow(props.original.id, true) 
                                })}
                            >
                            <FontAwesomeIcon icon="check" >
                            </FontAwesomeIcon>
                        </BtnConfirm> : 
                        
                        <BtnResponded  onClick={(() => { 
                            confirmRow(props.original.id, false) 
                            })}
                            >
                            <FontAwesomeIcon icon="check" >
                            </FontAwesomeIcon>
                        </BtnResponded>
                        
                        
                        }
                    </>
                )
            },
            sortable: false,
            filterable: false,
            width: 100,
            maxWidth: 100,
            minWidth: 100
        },
    ]

    return (
        <>
            <div className="dashboard">
                <div className="dashboard__top">
                    <div className="card__box">
                        <div className="card">
                            <div className="cardtop_content">
                                <span>
                                    <FontAwesomeIcon icon="calendar">
                                    </FontAwesomeIcon>
                                </span>
                                <h3>
                                    Rendez-vous
                                </h3>
                            </div>
                            <div className="cardbottom_content">
                                <span>
                                    { updatepnumber !== undefined ?updatepnumber: pnumber }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card__box">
                        <div className="card">
                            <div className="cardtop_content">
                                <span>
                                    <FontAwesomeIcon icon="user">
                                    </FontAwesomeIcon>
                                </span>
                                <h3>
                                    Patients
                                </h3>
                            </div>
                            <div className="cardbottom_content">
                                <span>
                                    { updatepnumber !== undefined ?updatepnumber: pnumber }
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card__box">
                        <div className="card">
                            <div className="cardtop_content">
                                <span>
                                    <FontAwesomeIcon icon="reply-all">
                                    </FontAwesomeIcon>
                                </span>
                                <h3>
                                    On hold
                                </h3>
                            </div>
                            <div className="cardbottom_content">
                                <span>
                                    {updateapnumber !== undefined ?updateapnumber: apnumber}
                                </span>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="dashboard__bottom">
                    <ReactTable 
                        data={updateDatas.length > 0 && updateDatas !== undefined ? updateDatas : datas }
                        columns={ columns }
                            />
                </div>
            </div>
        </>
    )
}

export default DashBoard
