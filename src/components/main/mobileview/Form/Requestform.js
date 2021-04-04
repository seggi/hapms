import React, { useState } from 'react'
import { authFetch } from '../../../auth'
import SelectDoctor from './Selectdoctor'

function RequestForm() {
    const [message, setMessage] = useState()
    const [fullname, setFullname] = useState()
    const [contacte, setContacte] = useState()
    const [select, setSelect] = useState()
    const [pickedDate, setPickedDate] = useState()
    const [description, setDescription] = useState()
    const [pickedTime, setPickedTime] = useState()

    const onChangeFullname = (e) => {
        setFullname(e.target.value)
    }

    const onChangeContacte = (e) => {
        setContacte(e.target.value)
    }

    const onChangeSelect = (e) => {
        setSelect(e.target.value)
    }

    const onChangePickedDate = (e) => {
        setPickedDate(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const onChangePickedTime = (e) => {
        setPickedTime(e.target.value)
    }



    const handleSubmit = (e) => {
        e.preventDefault()

        const opts = {
            'selectdoctor': select,
            'contacte': contacte,
            'fullname': fullname,
            'pickedDate': pickedDate,
            'description': description,
            'pickedTime': pickedTime,
        }

        authFetch("http://localhost:5000/main/api/request_appoinent", {
            method: "POST",
            credentials: "same-origin", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
        })
        .then(resp => resp.json())
        .then(result => {
            if(result.msg){
                alert(result.msg);
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
                    <span>Enter your full name</span>
                    <input
                        type="text"
                        placeholder="Enter full name"
                        value={ fullname }
                        onChange={ onChangeFullname  }
                        />

                    <span>Enter phone or emial</span>
                    <input
                        type="text"
                        placeholder="Phone or Email"
                        value={ contacte }
                        onChange={ onChangeContacte }
                        />

                    <span>Select dotor</span>
                    <SelectDoctor
                        selectDoctor = { select }
                        onChangeSelect ={ onChangeSelect }
                    >
                    </SelectDoctor>
                    
                    <span>Pick appointment date</span>
                    <input
                        type="date"
                        value={ pickedDate }
                        onChange = {onChangePickedDate}
                        />

                    <span>Pick appointment time</span>
                    <input 
                        type="time"
                        value={ pickedTime }
                        onChange={onChangePickedTime}
                        />

                    <span>Just in brief describe how you fill</span>
                    <textarea
                        placeholder="Just write some word here"
                        value = { description }
                        onChange={ onChangeDescription }
                        />

                    <input
                        type="submit"
                        onClick={ handleSubmit }
                        />
                </form>
            </div>
        </>
    )
}

export default RequestForm
