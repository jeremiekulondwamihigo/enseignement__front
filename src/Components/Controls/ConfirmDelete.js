import React from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from "@mui/material"
import Button from "@mui/material/Button"
import {Delete} from "@mui/icons-material"


export default function ConfirmDialog(props) {

    const {confirmDialog, setConfirmDialog} = props

    return (
        <Dialog open={
                confirmDialog.isOpen
            }
            style={
                {
                    padding: "2px",
                    position: "absolute",
                    top: '5px'
                }
        }>
            <DialogTitle><Delete color="secondary"/></DialogTitle>
            <DialogContent style={
                {textAlign: "center"}
            }>
                <Typography variant="h6">
                    {
                    confirmDialog.title
                } </Typography>
                <Typography variant="subtitle2">
                    {
                    confirmDialog.subTitle
                } </Typography>


            </DialogContent>
            <DialogActions style={
                {justifyContent: "center"}
            }>
                <button color="default"
                    onClick={
                        () => setConfirmDialog({
                            ...confirmDialog,
                            isOpen: false
                        })
                }>No</button>
                <button color="secondary"
                    onClick={
                        confirmDialog.onConfirm
                }>Yes</button>

            </DialogActions>
        </Dialog>
    )
}
