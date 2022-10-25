import React, {useState} from 'react'
import {
    Box,
    TextField,
    Button,
    Paper,
    Grid
} from '@mui/material';
import {Add} from "@mui/icons-material"
import {lien_create} from "../../Static/Liens"
import axios from "axios"
import {Alert, Stack} from "@mui/material"
import Autocompletion from '../../Utils/AutoComplete';
import DatePickers from '../../Utils/DatePicker';
import prototype from "prop-types"


function FormEleve(props) {

    const {dataLog, fechAgent} = props
    const {data} = dataLog

    const [message, setMessage] = useState()

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }
    const today = new Date()

    const gender = [
        {
            id: "M",
            title: "Masculin"
        }, {
            id: "F",
            title: "Féminin"
        },
    ]


    const [valueGender, setValueGender] = useState({id: "", title: ""})

    const [dateNaissance, setDateNaissance] = useState(null)

    const [values, setValue] = useState({
        code_tuteur: "",
        nom: "",
        postNom: "",
        prenom: "",
        lieu_naissance: "",
        nationalite: "",
        nomMere: "",
        professionMere: "",
        nomPere: "",
        professionPere: ""
    })

    const {
        code_tuteur,
        nom,
        postNom,
        prenom,
        lieu_naissance,
        nationalite,
        nomMere,
        professionMere,
        nomPere,
        professionPere
    } = values

    const handleChange = (e) => {
        const {value, name} = e.target
        setValue({
            ...values,
            [name]: value
        })

    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${lien_create}/eleve`, {
            id: today,
            code_tuteur,
            nom,
            postNom,
            prenom,
            date_Naissance: dateNaissance,
            lieu_naissance,
            genre: valueGender.id,
            agentSave: data[0].codeEtablissement,
            nationalite,
            nomMere,
            professionMere,
            nomPere,
            professionPere
        }, config);
        console.log(response)
        fechAgent()

        setMessage(response.data)
    }

    return (
        <div> {
            message && <Stack sx={
                    {width: '100%'}
                }
                spacing={2}>
                <Alert variant="filled"
                    severity={
                        message.error === false ? "success" : "warning"
                }>
                    <h3>{
                        message.message
                    }</h3>
                </Alert>
            </Stack>
        }
            <Paper elevation={0}
                style={
                    {padding: "20px"}
            }>
                <Box container
                    sx={
                        {
                            width: "100%",
                            maxWidth: '100%',
                            marginTop: "10px",
                            marginBottom: "10px",
                            display: 'flex'

                        }
                }>
                    <Grid style={
                        {marginRight: "10px"}
                    }>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            type="text"
                            value={nom}
                            name="nom"
                            sx={
                                {marginBottom: "10px"}
                            }
                            fullWidth
                            label="Entrez le nom *"
                            id="nom"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={postNom}
                            sx={
                                {marginBottom: "10px"}
                            }
                            name="postNom"
                            fullWidth
                            label="Entrez le Post-nom *"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={prenom}
                            sx={
                                {marginBottom: "10px"}
                            }
                            name="prenom"
                            fullWidth
                            label="Entrez le Prénom *"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={lieu_naissance}
                            sx={
                                {marginBottom: "10px"}
                            }
                            name="lieu_naissance"
                            fullWidth
                            label="Lieu de naissance *"/>
                        <DatePickers value={dateNaissance}
                            setValue={setDateNaissance}
                            label="Entrez la date de naissance *"/>
                        <Autocompletion sx={
                                {marginBottom: "10px"}
                            }
                            value={valueGender}
                            setValue={setValueGender}
                            items={gender}
                            label="Genre *"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={nationalite}
                            name="nationalite"
                            sx={
                                {marginBottom: "10px"}
                            }
                            fullWidth
                            label="Nationalité *"/>
                    </Grid>
                    <Grid style={
                        {marginRight: "10px"}
                    }>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            type="text"
                            value={nomPere}
                            name="nomPere"
                            sx={
                                {marginBottom: "10px"}
                            }
                            fullWidth
                            label="Entrer le nom du père"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            type="text"
                            value={professionPere}
                            name="professionPere"
                            sx={
                                {marginBottom: "10px"}
                            }
                            fullWidth
                            label="Profession du père"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={nomMere}
                            sx={
                                {marginBottom: "10px"}
                            }
                            name="nomMere"
                            fullWidth
                            label="Entrez le nom de la mère"/>
                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={professionMere}
                            sx={
                                {marginBottom: "10px"}
                            }
                            name="professionMere"
                            fullWidth
                            label="Profession de la mère"/>

                        <TextField autoComplete='off'
                            onChange={
                                (e) => handleChange(e)
                            }
                            value={code_tuteur}
                            name="code_tuteur"
                            sx={
                                {marginBottom: "10px"}
                            }
                            fullWidth
                            label="Entrez le code du tuteur"/>
                    </Grid>
                </Box>
                <Button onClick={
                        (e) => handleSave(e)
                    }
                    variant="contained"
                    endIcon={<Add/>}
                    color="secondary">
                    Enregistrer
                </Button>
            </Paper>

        </div>
    )
}

FormEleve.prototype = {
    Autocompletion: prototype.node.isRequired,
    DatePickers: prototype.node.isRequired,
    dataLog: prototype.object.isRequired,
    fechAgent: prototype.func.isRequired,
    data: prototype.array,
    message: prototype.any,
    config: prototype.object.isRequired,
    today: prototype.string.isRequired,
    gender: prototype.array.isRequired,
    valueGender: prototype.object.isRequired,
    dateNaissance: prototype.any,
    value: prototype.object.isRequired,
    code_tuteur: prototype.string.isRequired,
    nom: prototype.string.isRequired,
    lieu_naissance: prototype.string.isRequired,
    handleChange: prototype.func.isRequired,
    handleSave: prototype.func.isRequired

}
export default FormEleve
