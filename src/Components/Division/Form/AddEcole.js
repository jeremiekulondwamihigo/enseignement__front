import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material';
import { Add, Edit } from "@mui/icons-material"
import { lien_create, isEmpty, lien_update } from "../../Static/Liens"
import axios from "axios"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ProtoType from "prop-types"


 function AddEcole ({ dataLog, dataModifier }){

    const  { data } = dataLog

    const [message, setMessage] = useState()
    const [messageCatch, setMessageCatch] = useState()

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }
      const { code_proved } = data[0]
      const id = new Date()
    
      // const { code_province, code_agent, denomination, code_proved, id } = data

      const [etablissement, setEtablissement] = useState("");
      const [codeAgent, setCodeAgent] = useState("")

      const addDivision =async (e)=>{
        e.preventDefault()
        const response = await axios.post(`${lien_create}/addetablissement`, {
          etablissement, code_agent : codeAgent, code_proved,  id }, config);
       
          if(response.data.catch === true){
            setMessageCatch(response.data.message.keyPattern)
          }else{
            
            setMessage(response.data)
          }
      }

    return(
        <div>
            {
          message && 
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity={message.error === false ? "success" : "warning"}>
              <h3>{message.message}</h3>
            </Alert>
          </Stack>
        }
        <Paper elevation={3} style={{padding:"20px"}}>
            <Box
            container
            sx={{
                width: "100%",
                maxWidth: '100%',
                marginTop:"10px",
                marginBottom: "10px"
            }}
            
            >
                    <Grid style={{marginRight:"10px"}}>
                      <div className='divForm'>
                        <TextField className='textField' onChange={(e)=>setEtablissement(e.target.value)} value={etablissement} label="Etablissement" name="etablissement" />
                        { messageCatch?.etablissement ? <span className='Error___catch'>Le nom de l'établissement est obligatoire</span> : null}
                      </div>
                      <div className='divForm'>
                        <TextField className='textField' value={codeAgent} onChange={(e)=>setCodeAgent(e.target.value)}   label="code agent" name="code_agent" />
                      </div>
                    </Grid>
                        
            </Box>
            <Button variant="contained" endIcon={ dataModifier ? <Edit/> : <Add/>} color={dataModifier ? "secondary":"primary"} onClick={(e)=>addDivision(e)}>
                { dataModifier ? "Modification":"Enregistrement"}
            </Button>
        </Paper>

        </div>
    )
}

AddEcole.ProtoType = {
  data : ProtoType.array.isRequired,
  message : ProtoType.any,
  messageCatch : ProtoType.any,
  config : ProtoType.object.isRequired,
  code_proved : ProtoType.string.isRequired,
  id : ProtoType.string.isRequired,
  etablissement : ProtoType.string,
  codeAgent : ProtoType.string,
  addDivision : ProtoType.func,


}
export default AddEcole