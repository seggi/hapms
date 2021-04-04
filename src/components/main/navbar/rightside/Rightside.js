import React from 'react'
import styled from 'styled-components';
import { AboutusButton, NormalButton, SignupButton } from '../../button/Button';

const RightSideconents = styled.div`
    align-self: center;
`;

function RightSide() {
    return (
        <>
            <RightSideconents>
                <NormalButton />
                <AboutusButton />
                <SignupButton />
            </RightSideconents>
        </>
    )
}

export default RightSide
