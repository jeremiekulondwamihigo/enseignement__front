import React, { useEffect, useState } from 'react'
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { Add } from "@mui/icons-material"
import axios from 'axios'
import { lien_create, lien_read, isEmpty } from "../../../Static/Liens" 


function Add_Cours(props) {

    const { code_option, niveau } = props

    const [domaine, setDomaine] = useState('');
    const [cours, setCours] = useState("");
    const [maxima, setMaxima] = useState(0);


  const handleChange = (event) => {
    setDomaine(event.target.value);
  };
  const [rechercheData, setRechercheDomaine] = useState([])
  

  const config = {
    headers : {
      "Content-Type":"application/json",
      "Authorization": "Bearer "+localStorage.getItem("authToken")
    }
  }
  
  const loading =()=>{
      if(!isEmpty(niveau)){
        axios.get(`${lien_read}/readdomaine/${code_option}/${niveau}`, config).then(respo=>{
        setRechercheDomaine(respo.data)
    })
    }
  }

  useEffect(()=>{
    loading()
  }, [niveau, code_option])

  const submit =()=>{
    axios.post(`${lien_create}/addcours`, { cours, domaine, id : new Date(), maxima }, config).then(response=>{
        console.log(response)
    })
  }

  return (
      <Box
        sx={{
            width: 500,
            maxWidth: '100%',
            marginTop:"10px",
            marginBottom: "10px"
            
          }}
        >
          
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selectionnez le domaine</InputLabel>
        {
            !isEmpty(rechercheData) &&
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={domaine}
            label="Age"
            onChange={handleChange}
            sx={{
                width:500,
                marginBottom : "10px"
            }}
            >
                {
                    rechercheData.map((index, key)=>{
                        return <MenuItem key={key} value={index.code_domaine} >{index.domaine}</MenuItem>
                    })
                }
            </Select>
            }
      </FormControl>

          
          <TextField  fullWidth label="Ajouter Cours" id="cours" onChange={(e)=>setCours(e.target.value)}/>
          <TextField  fullWidth label="Maxima" id="maxima" onChange={(e)=>setMaxima(e.target.value)}/>

          <Button variant="contained" endIcon={<Add />} style={{marginTop:"20px"}} onClick={()=>submit()}>
            Enregistrer
        </Button>
    </Box>
    
  )
}

export default React.memo(Add_Cours)