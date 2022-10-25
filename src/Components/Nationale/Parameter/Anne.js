import React, {useState} from 'react';
import {Button} from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {lien_create} from '../../Static/Liens';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TextField from '@mui/material/TextField';
import Prop from "prop-types";

function Anne({readYear}) {

    const [anneeDebut, setValuesDebut] = useState('');
    const [anneeFin, setAnneeFin] = useState('')
    const [openProgress, setOpenProgress] = useState(false)
    const [Message, setMessage] = useState({})
    const id = new Date()

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }
    const submitYear = () => {

        setMessage(null)
        if ((parseInt(anneeFin) - parseInt(anneeDebut)) !== 1) {

            setMessage({error: true, message: "Valeur incorrecte"})
        } else {
            setOpenProgress(true)
            axios.post(`${lien_create}/addyear`, {
                annee: `${anneeDebut} - ${anneeFin}`,
                id
            }, config).then(response => {
                if (response.data) {
                    setTimeout(() => {
                        setOpenProgress(false)
                        setMessage(response.data)
                        readYear()
                    }, 1000);

                }
            })
        }
    }


    return (
        <div> {
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
            <Box sx={
                    {
                        width: 500,
                        maxWidth: '100%',
                        marginTop: "30px",
                        marginBottom: "20px"
                    }
                }
                component={'div'}>
                <div style={
                    {marginBottom: "10px"}
                }>
                    <TextField fullWidth label="Début" id="fullWidth"
                        onChange={
                            (e) => setValuesDebut(e.target.value)
                        }
                        value={anneeDebut}/>
                </div>
                <div>
                    <TextField fullWidth label="Fin" id="fullWidth"
                        onChange={
                            (e) => setAnneeFin(e.target.value)
                        }
                        value={anneeFin}/>
                </div>


            </Box>
            <Button variant='outlined' color="primary"
                onClick={
                    () => submitYear()
            }>Enregistrer</Button>

        </div>
    )
}

Anne.Prop = {
    anneeDebut: Prop.string.isRequired,
    anneeFin: Prop.string.isRequired,
    openProgress: Prop.string.isRequired,
    Message: Prop.object,
    config: Prop.object.isRequired,
    submitYear: Prop.func.isRequired
}
export default Anne
