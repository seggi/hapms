import React from 'react'
import styled from 'styled-components';
import { AboutusButton, HomeButton, NormalButton, SignupButton } from '../../button/Button';

const RightSideconents = styled.div`
    align-self: center;
`;

function SignupRightSide() {
    return (
        <>
            <RightSideconents>
                <HomeButton />
                <SignupButton />
            </RightSideconents>
        </>
    )
}

export default SignupRightSide
