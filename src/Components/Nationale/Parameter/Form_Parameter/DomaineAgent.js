import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Paper, Stack, Alert } from "@mui/material"
import { lien_create } from "../../../Static/Liens"
import axios from "axios"

function DomaineAgent(props) {

    const { donner, readDomaine } = props
    

    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }

    const [domaine, setDomaine] = useState({codeDomaine :"", title:"" })
    const { title } = domaine
    
    const [message, setMessage] = useState()
    const id = new Date()


    const addDomaine = async (e)=>{
        e.preventDefault();
        const response = await axios.post(`${lien_create}/domaineAgent`, {domaine : title, id}, config);
        const { data } = response;
        setMessage(data)
        readDomaine()
    }
    const changeDomaine = async (e)=>{
        e.preventDefault()
    }
    useEffect(()=>{
      if(donner){
        setDomaine({...donner})
      }
    }, [donner])
  return (
    <Paper elevation={3} style={{padding:"10px"}}>
        {
          message && 
          <Stack sx={{ width: '100%', marginBottom:'20px' }} spacing={2}>
            <Alert variant="filled" severity={message.error === false ? "success" : "warning"}>
              <h3>{message.message}</h3>
            </Alert>
          </Stack>
        }
      <Box
        sx={{
          maxWidth: '100%',
          marginBottom:"10px"
        }}
        component={'div'}
        >
            <span>
            <TextField 
            fullWidth 
            name="title"
            label="Entrez le domaine d'étude" 
            id="fullWidth"
            autoComplete='off'
            value={title}
            onChange={(e)=>setDomaine({...domaine, title : e.target.value})}
              />
            </span>
            
        </Box>
        <Button variant='contained' onClick={donner ? (e)=>changeDomaine(e) : (e)=>addDomaine(e)} color="primary">{ donner ? "Modification":"Enregistrement"}</Button>
    
    </Paper>
  )
}

export default DomaineAgent
