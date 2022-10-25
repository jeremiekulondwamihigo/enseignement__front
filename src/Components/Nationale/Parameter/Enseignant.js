import React, {useEffect, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {TextField, Paper, Button} from "@mui/material"
import AlertTitle from '@mui/material/AlertTitle';
import Combo_Autocomplete from '../../utils/Autocomplete';
import {lien_create, lien_update, fonction} from "../../Static/Liens"

function Enseignant(props) {


    const {data, id, loading} = props

    const [codeEcole, setCodeEcole] = useState("PQUYGC9FR") // Ce code est enregistrer dans le cookies lors du login
    const [initialeValue, setInitialeValue] = useState("")
    const [openProgress, setOpenProgress] = useState(false)
    const [Message, setMessage] = useState()
    const [values, setValues] = useState({nom_agent: "", phone_agent: ""})

    const updatingEcole = (e) => {
        e.preventDefault()
        setOpenProgress(true)
        axios.put(`${lien_update}/updateagent`, {
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
        axios.post(`${lien_create}/agent`, {
            nom_agent: values.nom_agent,
            tache_agent: initialeValue,
            phone_agent: values.phone_agent,
            id: new Date(),
            code_Ecole: codeEcole
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
                <TextField label="Nom de l'Agent" id="standard-start-adornment"
                    sx={
                        {
                            m: 1,
                            width: '50ch'
                        }
                    }
                    variant="outlined"
                    name="nom_agent"
                    value={
                        values.nom_agent
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
                <Combo_Autocomplete data={fonction}
                    state={
                        initialeValue || ""
                    }
                    setState={setInitialeValue}
                    labelprops="Selectionner la fonction"/>
            </FormControl>
            <FormControl fullWidth
                sx={
                    {m: 1}
                }
                variant="filled">
                <TextField label="Numero téléphone" id="standard-start-adornment"
                    sx={
                        {
                            m: 1,
                            width: '50ch'
                        }
                    }
                    variant="outlined"
                    name="phone_agent"
                    value={
                        values.phone_agent
                    }
                    onChange={
                        (e) => handleChange(e)
                    }/>
            </FormControl>
            <Box>
                <Button onClick={data ? (e)=>updatingEcole(e) : (e)=>SubmitData(e)} color="primary" variant='outlined' sx={{ m: 1, width: '25ch' }}> {data ? "Modifier":"Enregistrer"}
                </Button>
                </Box>
        </Paper>
                </React.Fragment>
            

            )}

export default Enseignant
