import React, { useState } from 'react';
import { Button, TextField, Box } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import { lien_create } from '../../Static/Liens';
import axios from 'axios';

export default function Section() {

  const [section, setValues] = useState("");
  const [openProgress, setOpenProgress] = useState(false)
  const [Message, setMessage] = useState()
  const id = new Date()
  
  const submitSession =()=>{
    const config = {
      headers : {
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("authToken")
      }
    }
    setOpenProgress(true)
    setMessage(null)
    axios.post(`${lien_create}/addsection`, {section, id }, config).then(response =>{
      console.log(response)
      if(response.data){
        setTimeout(() => {
          setOpenProgress(false)
          setMessage(response.data)
        }, 2000);
      }
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
        <p style={{ color : `${Message.error ? "red":"green"}`}}>{Message.message}</p>
      }
      

        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
            marginTop:"30px",
            marginBottom: "20px"
          }}
          >
              <TextField 
              fullWidth 
              label="Enregistrer la section"
              id="fullWidth"
              value={section}
              onChange={(e)=>setValues(e.target.value)}
              />
          </Box>
          <Button variant='outlined' color="primary" onClick={()=>submitSession()}>Enregistrer</Button>

    </div>
  )
}
