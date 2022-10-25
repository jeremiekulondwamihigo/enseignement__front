import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material';
import { Add, Edit } from "@mui/icons-material"
import { lien_create, isEmpty, lien_update } from "../../Static/Liens"
import axios from "axios"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { fonctionLog } from "../../Utils/Fonction"


export default function Division ({ dataLog }){

    const  { data } = dataLog


    const [message, setMessage] = useState()
    const [messageCatch, setMessageCatch] = useState()

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }
      const { code_province } = data[0]
      const id = new Date()
    
      // const { code_province, code_agent, denomination, code_proved, id } = data

      const [denomination, setDenomination] = useState("");
      const [codeProved, setCodeProved] = useState("")
      const [codeAgent, setCodeAgent] = useState("")

      const addDivision =async (e)=>{
        e.preventDefault()
        const response = await axios.post(`${lien_create}/division`, {
          code_province, code_agent : codeAgent, denomination, code_proved : codeProved, id }, config);
       
          console.log(response.data)
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
                marginBottom: "10px",
                
                
            }}
            
            >
                    <Grid style={{marginRight:"10px"}}>
                      <div className='divForm'>
                        <TextField className='textField' disabled value={code_province} label="Code de la province" name="code_province" />
                        { messageCatch?.code_province ? <span className='Error___catch'>Le code de la province doit être unique</span> : null}
                      </div>
                      <div className='divForm'>
                        <TextField className='textField' value={codeAgent} onChange={(e)=>setCodeAgent(e.target.value)}   label="code agent" name="code_agent" />
                      </div>
                      <div className='divForm'>
                        <TextField className='textField' value={denomination} onChange={(e)=>setDenomination(e.target.value)} label="Dénomination" name="denomination" />
                        { messageCatch?.denomination ? <span className='Error___catch'>La dénomination doit être unique</span> : null}
                      </div>
                      <div className='divForm'>
                        <TextField className='textField' value={codeProved} onChange={(e)=>setCodeProved(e.target.value)} label="Code Sous division" name="code_proved" />
                        { messageCatch?.code_proved ? <span className='Error___catch'>Le code du sous division doit être unique</span> : null}
                      </div>
                      {/* <div className='divForm'>
                        <RadioButtons items={fonctionLog("nationale")} label="Fonction de l'agent" setValue={setFonctionChange}/>
                      </div> */}
                          
                    </Grid>
                        
            </Box>
            <Button variant="contained" endIcon={<Add />} color="secondary" onClick={(e)=>addDivision(e)}>
                Enregistrer
            </Button>
        </Paper>

        </div>
    )
}