import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faUser, faReplyAll, faInbox, faCheck} from '@fortawesome/free-solid-svg-icons'

import { authFetch } from '../../auth';


function Responded() {
    const [datas, setDatas] = useState([])
    const [apnumber, setApnumber] = useState()
    const [confirmation, setConfirmation] = useState()
    const [updatepnumber, setUpdatePnumber] = useState()
    const [updateapnumber, setUpdateApnumber] = useState()



    useEffect(() => {
            authFetch("http://localhost:5000/main/api/responded_request", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(result => {
            if (result.data){
                
                let getcollecttable = result.data.map((item, index) => {
                    let getdatas = {
                        id: item.id,
                        fullname: item.fullname, 
                        appointment: `${item.appointment_date} at ${item.appointment_time}`,
                        contacte: item.contacte,
                        sent_date: item.sent_date,
                        description: item.description,
                        getonhold: item.onhold,
                    
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
    ]

    return (
        <>
            <div className="reponse_box">
                <div className="dashboard__bottom">
                    <ReactTable 
                        data={datas}
                        columns={columns}
                    />
                </div>
            </div>
        </>
    )
}

export default Responded
