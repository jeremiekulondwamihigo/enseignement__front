import React, { useState } from 'react'
import { Paper, Grid, TextField, Box, Button, Stack, Alert } from "@mui/material"
import { Add } from "@mui/icons-material"
import { lien_create } from '../../../Static/Liens'
import axios from "axios"

function Etablissement_Form({ data }) {

    const { user, secteur } = data
    

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }
    
    const [valeur, setValeur] = useState({
        etablissement : "", id : new Date(), code_agent : ""
    })
    const { etablissement, id, code_agent } = valeur

    const change = (e)=>{
        const { name, value } = e.target
        setValeur({
            ...valeur,
            [name]:value
        }) 
    }
    const [ message, setMessage] = useState()
    const submit = async (e)=>{
        e.preventDefault()
        const response = await axios.post(`${lien_create}/addetablissement`, {
            etablissement, id, code_agent, code_secteur : user.code_secteur
        }, 
        config);
        const { data } = response
        setMessage(data)
    }
    

    
  return (
    <Paper elevation={3} style={{padding:"20px", width:"100%"}}>
        { message &&
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity={message?.error ? "warning" : "success"}>
              <h3>{message?.message}</h3>
            </Alert>
          </Stack>
        }
        
        <Box>
            <Grid style={{marginRight:"10px"}}>
                <TextField disabled value={user?.code_secteur} sx={{ marginBottom:"10px"}} fullWidth  id="agent_save" />
                <TextField type="text" onChange={(e)=>change(e)} value={etablissement}  name="etablissement" sx={{ marginBottom:"10px"}} fullWidth label="Nom de l'établissement" id="etablissement" />
                <TextField type="text" onChange={(e)=>change(e)} value={code_agent} name="code_agent"  sx={{ marginBottom:"10px"}} fullWidth label="code_agent" id="code_agent" />            
            </Grid>         
        </Box>
        <Button variant="contained" endIcon={<Add /> } onClick={(e)=>submit(e)} color="secondary" >
            Enregistrer
        </Button>
    </Paper>
  )
}

export default Etablissement_Form