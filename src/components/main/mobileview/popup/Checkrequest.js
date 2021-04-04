import React from 'react';
import styled from "styled-components"
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding : theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },

    dialogTitle: {
        paddingRight: '0px'
    }

}))

const BtnCloseModal = styled.button`
    color: white;
    background:  #f8c0c0bf;
    border: 1px solid #a09494a1;
    border-width: 1px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    outline: none;
    border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
    &:hover {
        cursor: pointer
    }

`


export default function CheckRequestPopup(props) {
    const {title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <BtnCloseModal
                        onClick={() => {setOpenPopup(false)}}
                        >
                        X
                    </BtnCloseModal>
                </div>
            </DialogTitle>
            <DialogContent dividers>
               {children}
            </DialogContent>
        </Dialog>
    )
}