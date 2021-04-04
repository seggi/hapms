import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { authFetch } from '../../../auth';
import { LogoutButton } from '../../button/Button';

const RightSideconents = styled.div`
    align-self: center;
    display: flex;
    flex-direction: row;
`;

const HeadContent = styled.h3 `
    color: white;
    border-radius: 50%;
    margin-top: 10px;
    text-align: center;
    text-decoration: none;
    padding: 10px;
    margin-right: 30px;
    text-transform: capitalize;
`


function AdminRightSide() {
    const [username, setUsername] = useState()
   
    useEffect(() => {
        authFetch("http://localhost:5000/main/api/login_id")
        .then(resp => resp.json())
        .then(result => {

            setUsername(result.data)
        })
    }, [])


    return (
        <>
            <RightSideconents>
                <HeadContent>{username}</HeadContent>
                <LogoutButton />
            </RightSideconents>
        </>
    )
}

export default AdminRightSide
