import React, {useEffect, useState} from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import {CalendarMonth} from "@mui/icons-material"
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {TextField, Paper, Button} from "@mui/material"
import AlertTitle from '@mui/material/AlertTitle';
import Combo_Autocomplete from '../../utils/Autocomplete';
import {data_province} from "../../utils/DataSide"
import {lien_create, lien_update} from "../../Static/Liens"

function Ecole_Form(props) {
    const {data, id, loading} = props

    const [initialeValue, setInitialeValue] = useState("")
    const [openProgress, setOpenProgress] = useState(false)
    const [Message, setMessage] = useState()
    const [values, setValues] = useState({nomEcole: "", adresse_ville: ""})

    const updatingEcole = (e) => {
        e.preventDefault()
        setOpenProgress(true)
        axios.put(`${lien_update}/ecole`, {
            valeur_id: id,
            idupdate: values
        }).then(response => {
            setMessage(response.data)
            setOpenProgress(false)
            loading()
        })
    }


    const handleChange = (e) => {
        const {value, name} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    useEffect(() => {
        if (data) {
            setValues({
                ...data
            })
        }
    }, [data])
    const SubmitData = (e) => {
        e.preventDefault()
        setOpenProgress(true)
        axios.post(`${lien_create}/ecole`, {
            nomEcole: values.nomEcole,
            adresse_province: initialeValue,
            adresse_ville: values.adresse_ville,
            id: new Date()
        }).then((response) => {
            setMessage(response.data)
            setOpenProgress(false)
            loading()
        })
    }
    return (<React.Fragment> {
        openProgress && <Box sx={
            {width: '100%'}
        }>
            <LinearProgress/>
        </Box>
    }
        {
        Message && <Alert severity={
            Message.error ? "warning" : "success"
        }>
            <AlertTitle>{
                Message.error ? "warning" : "success"
            }</AlertTitle>
            {
            Message.message
        } </Alert>
    }
        <Paper elevation={1}>
            <FormControl fullWidth
                sx={
                    {m: 1}
                }
                variant="filled">
                <TextField label="Nom de l'école" id="standard-start-adornment"
                    sx={
                        {
                            m: 1,
                            width: '50ch'
                        }
                    }
                    variant="outlined"
                    name="nomEcole"
                    value={
                        values.nomEcole
                    }
                    onChange={
                        (e) => handleChange(e)
                    }/>
            </FormControl>
            <FormControl fullWidth
                sx={
                    {m: 1}
                }
                variant="filled">
                <Combo_Autocomplete data={data_province}
                    state={initialeValue}
                    setState={setInitialeValue}
                    labelprops="Séléctionner la province"/>
            </FormControl>
            <FormControl fullWidth
                sx={
                    {m: 1}
                }
                variant="filled">
                <TextField label="Ville" id="standard-start-adornment"
                    sx={
                        {
                            m: 1,
                            width: '50ch'
                        }
                    }
                    variant="outlined"
                    name="adresse_ville"
                    value={
                        values.adresse_ville
                    }
                    onChange={
                        (e) => handleChange(e)
                    }/>
            </FormControl>
            <Box></Button sx={
                {
                    '& > button': {
                        m: 1 }
                            }} variant="filled"
            }} variant="filled"
                <Button onClick={data ? (e)=>updatingEcole(e) : (e)=>SubmitData(e)} color="primary" variant='outlined' sx={{ m: 1, width: '25ch' }}> {data ? "Modifier":"Enregistrer"}
                </Box></Paper>
                </React.Fragment>
            

            )}>export

export default Ecole_Form
