import React, {useEffect, useState} from "react"
import {
    Grid,
    TextField,
    Button,
    Stack,
    Alert
} from "@mui/material"
import Autocompletion from "../../Utils/AutoComplete"
import axios from "axios"
import {lien_create, lien_read} from "../../Static/Liens"
import ProtoType from "prop-types"

function InscriptionForm({dataLog, loadingEleve, graphique}) {

    const {data} = dataLog
    const {codeEtablissement} = data[0]

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("authToken")
        }
    }

    const items = [
        {
            id: 7,
            title: "7eme CTB"
        },
        {
            id: 8,
            title: "8eme CTB"
        },
        {
            id: 1,
            title: "Premiere"
        },
        {
            id: 2,
            title: "Deuxieme"
        }, {
            id: 3,
            title: "Troisieme"
        }, {
            id: 4,
            title: "Quatrieme"
        },
    ]
    const [niveau, setNiveau] = useState("")
    const [option, setOption] = useState([])
    const [selectOption, setSelectOption] = useState("")

    const readOptionEtablissement = async () => {
        const response = await axios.get(`${lien_read}/etablissementOption/${codeEtablissement}`, config);
        if (response.data) {
            let tableau = []
            for (let i = 0; i < response.data.length; i++) {
                tableau.push({"id": response.data[i].code_Option, "title": response.data[i].option})
            }
            setOption(tableau)
        }

    }
    useEffect(() => {
        readOptionEtablissement()
    }, [])

    const [codeInscription, setCodeInscription] = useState("")
    const id = new Date()
    const [message, setMessage] = useState()

    const postEleve = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${lien_create}/inscription`, {
            niveau: niveau.id,
            codeEtablissement,
            codeInscription,
            code_Option: selectOption.id,
            id
        }, config);

        setMessage(response.data)
        loadingEleve()
        graphique()

    }

    return (
        <div>
            <Grid style={
                {marginRight: "10px"}
            }>
                {
                message && <Stack sx={
                        {
                            width: '100%',
                            marginBottom: "15px"
                        }
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
                <Autocompletion sx={
                        {marginBottom: "10px"}
                    }
                    value={niveau}
                    setValue={setNiveau}
                    items={items}
                    label="Classe"/> {
                niveau.id < 5 && <Autocompletion sx={
                        {marginBottom: "10px"}
                    }
                    value={selectOption}
                    setValue={setSelectOption}
                    items={option}
                    label="Séléctionner l'option"/>
                }
            }

                <TextField sx={
                        {marginBottom: "10px"}
                    }
                    fullWidth
                    value={codeInscription}
                    id=""
                    name="codeInscription"
                    label="Code inscription"
                    onChange={
                        (e) => setCodeInscription(e.target.value)
                    }/>
                <Button color="primary" variant="outlined"
                    onClick={
                        (e) => postEleve(e)
                }>
                    Inscrire
                </Button>

            </Grid>
        </div>
    )
}

InscriptionForm.ProtoType = {
    config: ProtoType.object.isRequired,
    data: ProtoType.object.isRequired,
    codeEtablissement: ProtoType.string.isRequired,
    dataLog: ProtoType.object.isRequired,
    niveau: ProtoType.string,
    option: ProtoType.array,
    selectOption: ProtoType.string,
    readOptionEtablissement: ProtoType.func.isRequired,
    codeInscription: ProtoType.string,
    id: ProtoType.any.isRequired,
    postEleve: ProtoType.func.isRequired,
    items: ProtoType.array.isRequired
}

export default React.memo(InscriptionForm)
