import React, {useState, useEffect} from 'react'

import styled from 'styled-components'


import { objectsMain } from './mainobject'
import Leftside from './navbar/Leftside'
import LoginRightSide from './navbar/rightside/Loginrightside'

import './Login.css'

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


function Signup() {
    const [fullname, setFullname] = useState('')
    const [contacte, setContacte] = useState('')
    const [hospital, setHospital] = useState('')
    const [dfunction, setDfunction] = useState('')
    // const [picture, setPicture] = useState()
    // const [isFilePicked, setIsFilePicked] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ reppassword, setReppassword] = useState('')

    const onChangeDfunction = (e) => {
        setDfunction(e.target.value)
    }

    // const onChangePicture = (e) => {
    //     setPicture(e.target.files[0])
    //     setIsFilePicked(true);
    // }

    const onChangeFullname = (e) => {
        setFullname(e.target.value)
    }

    const onChangeContacte = (e) => {
        setContacte(e.target.value)
    }

    const onChangeHospital = (e) => {
        setHospital(e.target.value)
    }

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onChangeReppasword = (e) => {
        setReppassword(e.target.value)
    }

    const handleSubmit = (e) => {
       e.preventDefault()

       let opts = new FormData();
    //    formData.append('File', picture)
       
       opts = {
            "fullname": fullname,
            "contacte": contacte,
            "hospital": hospital,
            "username": username,
            "password": password,
            "reppassword": reppassword,
            "function": dfunction
       }

       console.log(opts)

       if (fullname != '' && contacte != '' && hospital != '' && dfunction != ''
                && username != '' && password != "" && reppassword != "") {
            if (password == reppassword) {
                fetch("http://localhost:5000/signup", {
                method: "POST",
                    credentials: "same-origin", 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(opts)
                })
                .then(resp => resp.json())
                .then(result => {
                    if (result.message) {
                        alert(result.message)
                    }
                    else {
                        alert(result.error)
                    }
                })
            }
            else {
                alert("Passwords did not match!")
            }
       }
       else {
           alert("You must fill field!")
       }
    }

    return (
        <>
             <NavbarStyle>
                <div className="leftside">
                    <Leftside {...objectsMain} />
                </div>
                {/* <div className="rightside">
                    <LoginRightSide {...objectsMain} />
                </div> */}
            </NavbarStyle>
            <div className="login__box">
                <div className="login__box-content">
                    <h1>Signup</h1>
                    <form enctype ='multipart/form-data'>
                        <span>Enter full name</span>
                        <input
                            type="text"
                            placeholder="Full-name"
                            value ={ fullname }
                            onChange={ onChangeFullname }
                            />

                        <span>Enter hospital</span>
                        <input
                            type="text"
                            placeholder="Hospital"
                            value = { hospital }
                            onChange={ onChangeHospital }
                            />

                        <span>Enter function</span>
                        <input
                            type="text"
                            placeholder="Function"
                            value = { dfunction }
                            onChange={ onChangeDfunction }
                            />

                        <span>Enter email or phone</span>
                        <input
                            type="text"
                            placeholder="Email or phone"
                            value = { contacte }
                            onChange = { onChangeContacte }
                            />

                        <span>Enter username</span>
                        <input
                            type="text"
                            placeholder="username"
                            value={ username }
                            onChange = { onChangeUsername }
                            />

                        <span>Enter password</span>
                        <input
                            type="password"
                            placeholder="*******"
                            value = { password }
                            onChange = { onChangePassword }
                            />

                        <span>Repeat password</span>
                        <input
                            type="password"
                            placeholder="*******"
                            value = { reppassword }
                            onChange = { onChangeReppasword }
                            />

                        {/* <span>Choose picture</span>
                        <input
                            type="file"
                            placeholder="Hospital"
                            // value = { picture }
                            name="file"
                            onChange={ onChangePicture }
                            multiple
                            /> */}
                        
                        <input
                            type="submit"
                            value="Signup"
                            onClick={ handleSubmit }
                            />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
