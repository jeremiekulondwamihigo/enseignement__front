import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material';
import { Add } from "@mui/icons-material"
import { lien_create } from "../../../Static/Liens"
import axios from "axios"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Domaine({ niveau, option }) {
  
    const config = {
        headers : {
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("authToken")
        }
      }
    const [domaines, setDomaine] = useState()
    const [message, setMessage] = useState()
    const now = new Date()

    const addDomaine =()=>{
        axios.post(`${lien_create}/adddomaine`, {
          domaine : domaines, 
          classe : niveau, 
          id : now, 
          option: option
        }, config).then(response =>{
          console.log(response)
            setMessage(response.data)
            
        })
    }
    return (
       <div>
        {
          message && 
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="filled" severity={message.error === false ? "success" : "warning"}>
              <h3>{message.error !== false ? message.error : message.message}</h3>
            </Alert>
          </Stack>
        }
        {
          niveau ? (<>
          <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            marginTop:"10px",
            marginBottom: "10px"
            
          }}
        >
          <TextField  fullWidth label="Ajouter domaine" id="domaine" onChange={(e)=>setDomaine(e.target.value)}/>
            
        </Box>
        <Button variant="contained" endIcon={<Add />} onClick={()=>addDomaine()}>
            Enregistrer
        </Button></>) : <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            marginTop:"10px",
            marginBottom: "10px"
            
          }}
        >
          <p style={{color:"red", textAlign:"center"}}>Veuillez selectionner le niveau</p>
          </Box>
        }
        
         
        
       </div>
      );
}

export default Domaine