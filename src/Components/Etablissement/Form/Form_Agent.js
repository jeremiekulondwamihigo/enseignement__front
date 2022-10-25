import React, { useState } from 'react'
import { Box, Alert, AlertTitle, TextField, Button, LinearProgress } from "@mui/material"
import { lien_read, lien_image_admin, lien_create } from "../../Static/Liens"
import axios from "axios"
import "./style.css"

function FormAgent({ dataLog }) {

  const config = {
    headers : {
      "Content-Type":"application/json",
      "Authorization": "Bearer "+localStorage.getItem("authToken")
    }
  }
  const { data } = dataLog

  const [ openProgress, setOpenProgress] = useState(false)
  const [Message, setMessage ] = useState()
  const [rechercheAgent, setRechercheAgent] = useState(false)
  const [agentFound, setAgentFound] = useState()
  const [codeAgent, setCodeAgent] = useState("")


  

  const readOne = async(e)=>{
    setOpenProgress(true)
    e.preventDefault()
    const response = await axios.get(`${lien_read}/oneAgent/${codeAgent}`, config)
    const { data } = response
    if(!data){
      setRechercheAgent(false)
      setAgentFound(null)
      setMessage({
        "message":"Agent introuvable",
        "error":true
      })
    }else{
      setAgentFound(data)
      setMessage(null)
      setRechercheAgent(true)
    }
    setOpenProgress(false)
    
  }
  const id = new Date()

  const recrute = async(e)=>{
    e.preventDefault()
    await axios.post(`${lien_create}/enseignantEcole`, {
      code_etablissement : data[0].codeEtablissement , 
      code_agent : codeAgent, id
    }, config)
    .then(response =>{
      setMessage(response.data)
    })
  }

  return (
        <div>
      {
        openProgress && 
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      }
      {
        Message && 
        <Alert severity={Message.error ? "warning":"success"} >
          <AlertTitle>{Message.error ? "warning":"success"}</AlertTitle>
          {Message.message}
        </Alert>
        
      }
      <Box
        sx={{
          width: "100%",
          marginTop:"30px",
          marginBottom: "20px",
          display:"flex",
        }}
        component={'div'}
        >
          <div style={{width:"60%"}}>
            <TextField 
              fullWidth 
              disabled
              id="fullWidth"
              style={{marginBottom:"10px"}}
              value={data[0].etablissement}
            />
            <TextField 
              fullWidth 
              label="code de l'agent" 
              id="fullWidth"
              value={codeAgent}
              onChange={(e)=>setCodeAgent(e.target.value)}
            />
            </div>
            {
              agentFound &&
              <>
                <div style={{marginLeft:"20px", width:"40%" }}>
                  <div className="imageAgent">
                    <img src={`${lien_image_admin}/${agentFound?.filename}`}/>
                  </div>
                  <h5>Nom : {agentFound?.nom}</h5>
                  <h5>Fonction : {agentFound?.fonction}</h5>
                  
                </div>
                
              </>
               
            }
            
            
        </Box>
        <Button variant='outlined' onClick={!rechercheAgent ? (e)=>readOne(e) : (e)=>recrute(e)} color={!rechercheAgent ? "secondary":"primary"} >
          { !rechercheAgent ? "Vérification" : "Recruter"}
        </Button>
    </div>
  )
}

export default FormAgent