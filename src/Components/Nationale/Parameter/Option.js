import React, {useState} from 'react';
import {Button, Box, TextField} from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import {lien_create, lien_update} from '../../Static/Liens';
import axios from 'axios';
import Prop from "prop-types"

export default function OptionFunction(props) {

    const {code_section} = props
    const {option_modification} = props

    const [valeur, setValeur] = useState("")
    const [openProgress, setOpenProgress] = useState(false)
    const [Message, setMessage] = useState({})

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }

    const AddOption = () => {
        setOpenProgress(true)
        axios.post(`${lien_create}/addoption`, {
            code_Section: code_section,
            option: valeur,
            id: new Date()
        }, config).then(response => {
            if (response) {
                setMessage(response.data)
                setOpenProgress(false)
            }
        })
    }

    const updateYear = (e) => {
        e.preventDefault()
        axios.put(`${lien_update}/updateoption`, {
            _id: option_modification,
            option_modification: valeur
        }, config).then((response) => {
            setTimeout(() => {
                setMessage(response.data)
            }, 2000);
        })
    }

    return (
        <div> {/* 
            openProgress && <Box sx={
            {width: '100%'}
        }>
            <LinearProgress/>
        </Box>
    }
        {
        Message && <p>{Message.message}</p>  (<>
                                <Box sx={
                                    {
                                        width: 500,
                                        maxWidth: '100%',
                                        marginTop: "30px",
                                        marginBottom: "20px"
                                    }
                                }>
                                    <TextField fullWidth
                                        label={
                                            `${
                                                option_modification ? "Modifiez l'option " + option_modification : `Enregistrer l'option, code section ${code_section}`
                                            }`
                                        }
                                        id="fullWidth"
                                        onChange={
                                            (e) => setValeur(e.target.value)
                                        }
                                        value={valeur}/>
                                </Box>
                                <Button variant='outlined' color="primary"
                                    onClick={
                                        option_modification ? (e) => updateYear(e) : (e) => AddOption(e)
                                }>
                                    {
                                    option_modification ? "Modification" : "Enregistrer"
                                } </Button>
                                </>)
                        
                            </div>
                            
                            )
            */}

            <p>Option</p>

        </div>
    )
}


    // OptionFunction.Prop = {
    //     code_section: Prop.string.isRequired,
    //     option_modification: Prop.string.isRequired,
    //     valeur: Prop.string,
    //     openProgress: Prop.bool.isRequired,
    //     Message: Prop.object,
    //     config: Prop.object.isRequired,
    //     AddOption: Prop.func.isRequired,
    //     updateYear: Prop.func.isRequired


    // }