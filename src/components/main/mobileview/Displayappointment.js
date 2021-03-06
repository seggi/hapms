import React, {useState, useEffect} from 'react'

import {authFetch} from "../../auth";

import './Displayappointment.css';

const  RetrieveDoctorsList = (props) => {
    return (
        <>
             <div className="cart__box">
                <div className="cart__box-left">
                   {props.picture !== undefined && props.picture !== null
                                ?
                                <img src={`images/${props.picture}`}/>
                                : <img src="images/doctors.png" />
                    }
                </div>
                <div className="cart__box-right">
                    <span>Dr. {props.fullname}</span>
                    <span>{props.function !== undefined ? props.function : `Nothing to show` }</span>
                </div>
            </div>
        </>
    )
}

function DisplayAppointment() {
    const [data, setData] = useState([])

    

    useEffect(() => {
        authFetch("http://localhost:5000/main/api/retrieve_doctors")
        .then(resp => resp.json())
        .then(result => {
            setData(result.data)
        })
    }, [])


    return (
        <>
            <div className="displaydoctors__box">
                <div className="displaydoctors__box-inner">
                   {
                       data.map((item) => {
                            return RetrieveDoctorsList(item)
                       })
                   }
                </div>
            </div>
        </>
    )
}

export default DisplayAppointment
