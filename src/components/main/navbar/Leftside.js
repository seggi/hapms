import React from 'react'
import styled from 'styled-components'
import { NormalButton} from '../button/Button'


const LeftSide = styled.div`
    align-self: center;
    font-size: 22px;
    font-wieght: 600;
    margin-left: 30px;
`

const LogoStyle = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: white;
    &:hover{
        cursor: pointer;
        
    }
`

function Leftside({logo}) {
    return (
        <>
            <LeftSide>
                < LogoStyle>
                    {logo}
                </ LogoStyle>
            </LeftSide>
        </>
    )
}

export default Leftside

