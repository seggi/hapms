import React, { useState } from 'react'
import { authFetch } from '../../../auth'
import SelectDoctor from './Selectdoctor'


function CheckRequestForm() {
    const [message, setMessage] = useState()
    const [contacte, setContacte] = useState()
    const [pickedDate, setPickedDate] = useState()
    const [getcontacte, setGetContacte] = useState()
    const [getpickedDate, setGetPickedDate] = useState()

    const onChangeContacte = (e) =>  {setContacte(e.target.value)}
    
    const onChangePickedDate = (e) => {
        setPickedDate(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const opts = {
            'contacte': contacte,
            'pickedDate': pickedDate,
        }

        authFetch("http://localhost:5000/main/api/get_feed_back", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
        })
        .then(resp => resp.json())
        .then(result => {
            if(result.data){
                console.log(result.data)
                result.data.map((item) => {
                    setGetContacte(item)
                })
              
            }
            else if (result.error) {
                alert(result.error);
            }
        })
    }

    return (
        <>
            <div className="form__box">
                <form>
                   
                    <span>Enter phone or email to check your request has been accepted!</span>
                    <input
                        type="text"
                        placeholder="Phone or Email"
                        value={ contacte }
                        onChange={ onChangeContacte }
                        />

                    <span>Pick appointment date</span>
                    <input
                        type="date"
                        value={ pickedDate }
                        onChange = {onChangePickedDate}
                        />

                    <input
                        type="submit"
                        onClick={ handleSubmit }
                        />
                </form>
            </div>
            {
                    
                    <div style={{ padding: "8px" }}>
                        {
                            getcontacte !== undefined ?
                               <>
                                     { getcontacte.onhold !== 1 
                                        ? 
                                        <div style={{ padding: "8px", border: '1px solid red' }}>
                                            <span style={{ color: "red" }}>{`Your ${getcontacte.date} is still on hold`}</span> 
                                        </div>
                                        : 
                                        <div style={{ padding: "8px", border: '1px solid green' }}>
                                            <span style={{ color: "green" }}>{`Your ${getcontacte.date} request has been accepted`}</span>
                                        </div>
                                    } 
                               </>
                            : ""
                        }
                    </div>
                   
                }
        </>
    )
}

export default CheckRequestForm
