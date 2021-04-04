import React, {useState, useEffect} from 'react'
import { authFetch } from '../../../auth'

function SelectDoctor(props) {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        authFetch("http://localhost:5000/main/api/select_doctors", {
            method: "POST",
            credentials: "same-origin"
        }).then(resp => resp.json())
        .then(result => {
            setDatas(result.data)
        })
    }, [])

    return (
        <>
            <select
                name="doctors-list"
                value={props.selectDoctor}
                validations={[props.required]}
                onChange={ props.onChangeSelect }
            >
                <option value selected disabled>select_doctor</option>
                { datas.map((items) => 
                    <option key={items.id} value={items.id} >
                        {items.fullname} 
                    </option>)
                }
            </select>
        </>
    )
}

export default SelectDoctor
