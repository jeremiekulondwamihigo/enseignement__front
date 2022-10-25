import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up"
        ref={ref}
        {...props}/>;
});

export default function Popup(props) {
    const {openPopup, setOpenPopup, children, title} = props


    const handleClose = () => {
        setOpenPopup(false);
    };

    return (
        <div style={
            {width: "100%"}
        }>
            <Dialog open={openPopup}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                style={
                    {width: "100%"}
            }>
                <DialogTitle id="alert-dialog-slide-title">
                    {title} </DialogTitle>
                <DialogContent>

                    <DialogContentText id="alert-dialog-slide-description"
                        component={'span'}>
                        {children} </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}
